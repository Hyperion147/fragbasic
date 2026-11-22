"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { accountClient } from "@/server/account/client";
import { accountOrigin } from "@/server/account/config";
import { getSetupCatalog } from "@/server/catalog/setup";

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
  const client = await accountClient(true);
  if (!client) redirect("/account?notice=unavailable");
  const { data: { user } } = await client.auth.getUser();
  if (!user || form.get("owner") !== user.id) redirect("/account?notice=session");
  const catalog = await getSetupCatalog();
  const setup: Record<string, string> = {};
  for (const [category, models] of Object.entries(catalog)) {
    const id = form.get(category);
    if (id === "") continue;
    if (typeof id !== "string" || !models.some(model => model.id === id)) redirect("/account?notice=invalid");
    setup[category] = id;
  }
  const { error } = await client.auth.updateUser({ data: { fragbasic_setup: setup } });
  redirect(error ? "/account?notice=retry" : "/account?notice=saved");
}
