"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { accountClient } from "@/server/account/client";
import { accountOrigin } from "@/server/account/config";
import { getSetupCatalog } from "@/server/catalog/setup";
import { createAccountSetup, replaceAccountSetup, updateAccountProfile } from "@/server/account/setups";

const setupName = z.string().trim().min(1).max(60);

async function authenticatedUser() {
  const client = await accountClient(true);
  if (!client) redirect("/account?notice=unavailable");
  const { data: { user } } = await client.auth.getUser();
  if (!user) redirect("/account?notice=session");
  return user;
}

export async function sendLoginLink(form: FormData) {
  const email = z.email().safeParse(String(form.get("email") ?? "").trim());
  if (!email.success) redirect("/account?notice=email");
  const client = await accountClient(true);
  if (!client) redirect("/account?notice=unavailable");
  const { error } = await client.auth.signInWithOtp({
    email: email.data,
    options: { emailRedirectTo: accountOrigin() + "/account/confirm" },
  });
  if (error?.status === 429) redirect("/account?notice=rate");
  redirect(error ? "/account?notice=delivery" : "/account?notice=sent");
}

export async function signOut() {
  const client = await accountClient(true);
  if (client && (await client.auth.signOut({ scope: "local" })).error) redirect("/account?notice=retry");
  redirect("/account");
}

export async function saveSetup(form: FormData) {
  const user = await authenticatedUser();
  const setupId = z.uuid().safeParse(form.get("setup_id"));
  const name = setupName.safeParse(form.get("name"));
  const visibility = z.enum(["private", "unlisted", "public"]).safeParse(form.get("visibility"));
  if (!setupId.success || !name.success || !visibility.success) redirect("/account?notice=invalid");
  const catalog = await getSetupCatalog();
  const selections: Record<string, string> = {};
  const selectedModels = [];
  for (const [category, models] of Object.entries(catalog)) {
    const id = form.get(category);
    if (id === "") continue;
    const model = typeof id === "string" ? models.find(candidate => candidate.id === id) : null;
    if (!model) redirect("/account?notice=invalid");
    selections[category] = id as string;
    selectedModels.push({ ...model, category: category as keyof typeof catalog });
  }
  let saved = false;
  try { saved = await replaceAccountSetup({ userId: user.id, setupId: setupId.data, name: name.data, visibility: visibility.data, selections, models: selectedModels }); }
  catch { redirect("/account?notice=retry"); }
  redirect(saved ? `/account?setup=${setupId.data}&notice=saved` : "/account?notice=session");
}

export async function createSetup(form: FormData) {
  const user = await authenticatedUser();
  const name = setupName.safeParse(form.get("name"));
  if (!name.success) redirect("/account?notice=invalid");
  let id: string;
  try { id = await createAccountSetup(user.id, name.data); }
  catch { redirect("/account?notice=duplicate"); }
  redirect(`/account?setup=${id}`);
}

export async function saveProfile(form: FormData) {
  const user = await authenticatedUser();
  const rawUsername = String(form.get("username") ?? "").trim().toLowerCase();
  const username = z.union([z.literal(""), z.string().regex(/^[a-z0-9_]{3,30}$/)]).safeParse(rawUsername);
  const displayName = z.string().trim().max(60).safeParse(form.get("display_name"));
  const bio = z.string().trim().max(300).safeParse(form.get("bio"));
  const visibility = z.enum(["private", "public"]).safeParse(form.get("profile_visibility"));
  const returnSetup = z.uuid().safeParse(form.get("return_setup"));
  if (!username.success || !displayName.success || !bio.success || !visibility.success) redirect("/account?notice=profile");
  try { await updateAccountProfile(user.id, { username: username.data || null, displayName: displayName.data || null, bio: bio.data || null, visibility: visibility.data }); }
  catch { redirect("/account?notice=duplicate"); }
  const params = new URLSearchParams({ notice: "profile-saved" });
  if (returnSetup.success) params.set("setup", returnSetup.data);
  redirect(`/account?${params}`);
}
