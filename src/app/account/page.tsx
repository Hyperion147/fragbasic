import type { Metadata } from "next";
import Link from "next/link";
import { AtSign, Eye, LockKeyhole, LogOut, Mail, PackagePlus, Pencil, Save, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { accountClient } from "@/server/account/client";
import { getSetupCatalog } from "@/server/catalog/setup";
import { getAccountWorkspace } from "@/server/account/setups";
import { SETUP_CATEGORIES } from "@/features/setup-catalog/fields";
import { createSetup, saveProfile, saveSetup, sendLoginLink, signOut } from "./actions";
import { SetupPicker } from "./setup-picker";
import { SetupDetails } from "./setup-details";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "My account", robots: { index: false, follow: false } };

const notices: Record<string, string> = {
  email: "Enter a valid email address.",
  sent: "Check your email. Open the sign-in link in this browser to finish.",
  rate: "Please wait before requesting another sign-in link.",
  expired: "This link expired or was opened in another browser. Request a fresh link here.",
  delivery: "The sign-in email could not be sent. Please try again later.",
  unavailable: "Account sign-in is temporarily unavailable.",
  session: "Your account session changed. Sign in again before saving.",
  invalid: "A selected model is no longer available. Review your choices and save again.",
  retry: "That change could not be completed. Please try again.",
  saved: "Your setup is saved.",
  "profile-saved": "Your profile is saved.",
  profile: "Use 3–30 lowercase letters, numbers, or underscores for the username.",
  duplicate: "That username or setup name is already in use.",
};

export default async function AccountPage({ searchParams }: PageProps<"/account">) {
  const { notice, setup: requestedSetup, edit } = await searchParams;
  const client = await accountClient();
  const auth = client ? await client.auth.getUser() : null;
  const user = auth?.data.user;
  const account = user ? await getAccountWorkspace(user.id) : null;
  const catalog = user ? await getSetupCatalog() : null;
  const activeSetup = account?.setups.find(item => item.id === requestedSetup) ?? account?.setups[0];
  const message = typeof notice === "string" && Object.hasOwn(notices, notice) ? notices[notice] : null;
  return (
    <main className="page-section min-h-[60vh]">
      <div className="mx-auto max-w-5xl space-y-6">
        <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Account" }]} />
        <div><h1 className="page-title">My account</h1><p className="mt-2 max-w-2xl text-muted-foreground">Build a text-only gear profile that stays quick to edit and easy to share.</p></div>
        {message && <p role="status" className="rounded-md border border-border bg-card px-4 py-3 text-sm">{message}</p>}
        {!client ? <p>{notices.unavailable}</p> : user && catalog && account && activeSetup ? (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
            {edit === "setup" ? <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-xl">Edit {activeSetup.name}</CardTitle>
                <CardDescription>Update the setup details or replace any selected gear.</CardDescription>
                <CardAction><Button asChild variant="ghost"><Link href={`/account?setup=${activeSetup.id}`}>Cancel</Link></Button></CardAction>
              </CardHeader>
              <CardContent>
              <form action={saveSetup} className="grid gap-5 sm:grid-cols-2">
              <input type="hidden" name="setup_id" value={activeSetup.id} />
              <label className="grid gap-2 text-sm font-medium">Setup name<Input name="name" defaultValue={activeSetup.name} maxLength={60} required /></label>
              <label className="grid gap-2 text-sm font-medium">Visibility<Select name="visibility" defaultValue={activeSetup.visibility}><SelectTrigger className="min-h-10 border-input"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="private"><LockKeyhole /> Private</SelectItem><SelectItem value="unlisted"><Eye /> Unlisted</SelectItem><SelectItem value="public"><Eye /> Public</SelectItem></SelectContent></Select></label>
              {SETUP_CATEGORIES.map(category => <SetupPicker key={`${activeSetup.id}:${category}`} category={category} models={catalog[category]} defaultValue={activeSetup.selections[category]} />)}
              <Button type="submit" className="min-h-11 justify-self-start sm:col-span-2"><Save aria-hidden="true" /> Save setup</Button>
              </form>
              </CardContent>
            </Card> : <SetupDetails setup={activeSetup} />}
            <div className="grid gap-6">
              <Card size="sm"><CardHeader><CardTitle>My setups</CardTitle><CardDescription>{account.setups.length} saved</CardDescription></CardHeader><CardContent className="grid gap-2">{account.setups.map(item => <Button key={item.id} asChild variant={item.id === activeSetup.id ? "secondary" : "ghost"} className="h-auto min-h-10 justify-between"><Link href={`/account?setup=${item.id}`}><span className="truncate">{item.name}</span><Badge variant="outline">{item.selections && Object.keys(item.selections).length}</Badge></Link></Button>)}<form action={createSetup} className="mt-2 grid gap-2 border-t border-border pt-4"><label className="text-xs font-medium" htmlFor="new-setup-name">New setup</label><Input id="new-setup-name" name="name" placeholder="Travel setup" maxLength={60} required /><Button type="submit" variant="outline"><PackagePlus aria-hidden="true" /> Add setup</Button></form></CardContent></Card>
              <Card size="sm"><CardHeader><CardTitle className="flex items-center gap-2"><UserRound aria-hidden="true" className="size-4" /> {account.profile.displayName || "Your profile"}</CardTitle><CardDescription className="break-all">{user.email}</CardDescription>{edit !== "profile" && <CardAction><Button asChild size="icon-sm" variant="ghost"><Link href={`/account?setup=${activeSetup.id}&edit=profile`}><Pencil aria-hidden="true" /><span className="sr-only">Edit profile</span></Link></Button></CardAction>}</CardHeader><CardContent>{edit === "profile" ? <form action={saveProfile} className="grid gap-3"><input type="hidden" name="return_setup" value={activeSetup.id} /><label className="grid gap-1.5 text-xs font-medium">Display name<Input name="display_name" defaultValue={account.profile.displayName ?? ""} maxLength={60} /></label><label className="grid gap-1.5 text-xs font-medium">Username<Input name="username" defaultValue={account.profile.username ?? ""} minLength={3} maxLength={30} pattern="[a-z0-9_]+" /></label><label className="grid gap-1.5 text-xs font-medium">Profile visibility<Select name="profile_visibility" defaultValue={account.profile.visibility}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="private"><LockKeyhole /> Private</SelectItem><SelectItem value="public"><Eye /> Public</SelectItem></SelectContent></Select></label><label className="grid gap-1.5 text-xs font-medium">Bio<Textarea name="bio" defaultValue={account.profile.bio ?? ""} maxLength={300} /></label><div className="flex gap-2"><Button type="submit" variant="secondary"><Save aria-hidden="true" /> Save</Button><Button asChild variant="ghost"><Link href={`/account?setup=${activeSetup.id}`}>Cancel</Link></Button></div></form> : <div className="grid gap-3"><div className="flex items-center justify-between gap-2"><p className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground"><AtSign aria-hidden="true" className="size-4 shrink-0" /><span className="truncate">{account.profile.username || "Username not set"}</span></p><Badge variant="outline" className="capitalize">{account.profile.visibility}</Badge></div><p className="text-sm leading-relaxed text-muted-foreground">{account.profile.bio || "Add a short bio so your profile feels like yours."}</p>{account.profile.visibility === "public" && account.profile.username && <Button asChild variant="outline"><Link href={`/profiles/${account.profile.username}`}>View public profile</Link></Button>}</div>}<form action={signOut} className="mt-4 border-t border-border pt-3"><Button className="w-full" type="submit" variant="ghost"><LogOut aria-hidden="true" /> Sign out</Button></form></CardContent></Card>
            </div>
          </div>
        ) : (
          <Card className="max-w-lg"><CardHeader><CardTitle>Sign in to save your setup</CardTitle><CardDescription>Your first email sign-in creates the account. No password is needed.</CardDescription></CardHeader><CardContent><form action={sendLoginLink} className="grid gap-4"><label className="grid gap-2 text-sm font-medium">Email address<Input type="email" name="email" autoComplete="email" required /></label><Button type="submit" className="min-h-11 justify-self-start"><Mail aria-hidden="true" /> Email me a sign-in link</Button></form></CardContent></Card>
        )}
      </div>
    </main>
  );
}
