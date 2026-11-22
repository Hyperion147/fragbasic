import type { Metadata } from "next";
import { LogOut, Mail, Save, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { accountClient } from "@/server/account/client";
import { getSetupCatalog } from "@/server/catalog/setup";
import { saveSetup, sendLoginLink, signOut } from "./actions";
import { SetupPicker, setupLabels } from "./setup-picker";

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
};

export default async function AccountPage({ searchParams }: PageProps<"/account">) {
  const { notice } = await searchParams;
  const client = await accountClient();
  const auth = client ? await client.auth.getUser() : null;
  const user = auth?.data.user;
  const catalog = user ? await getSetupCatalog() : null;
  const message = typeof notice === "string" && Object.hasOwn(notices, notice) ? notices[notice] : null;
  return (
    <main className="page-section min-h-[60vh]">
      <div className="mx-auto max-w-5xl space-y-6">
        <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Account" }]} />
        <div><h1 className="page-title">My account</h1><p className="mt-2 max-w-2xl text-muted-foreground">Build a text-only gear profile that stays quick to edit and easy to share.</p></div>
        {message && <p role="status" className="rounded-md border border-border bg-card px-4 py-3 text-sm">{message}</p>}
        {!client ? <p>{notices.unavailable}</p> : user && catalog ? (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_17rem]">
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-xl">My setup</CardTitle>
                <CardDescription>Search the catalog by model or brand. Your selection stays private to your account for now.</CardDescription>
              </CardHeader>
              <CardContent>
              <form action={saveSetup} className="grid gap-5 sm:grid-cols-2">
              <input type="hidden" name="owner" value={user.id} />
              {(Object.keys(setupLabels) as (keyof typeof setupLabels)[]).map(category => <SetupPicker key={category} category={category} models={catalog[category]} defaultValue={user.user_metadata.fragbasic_setup?.[category]} />)}
              <Button type="submit" className="min-h-11 justify-self-start sm:col-span-2"><Save aria-hidden="true" /> Save setup</Button>
              </form>
              </CardContent>
            </Card>
            <Card size="sm">
              <CardHeader><CardTitle className="flex items-center gap-2"><UserRound aria-hidden="true" className="size-4" /> Signed in</CardTitle><CardDescription className="break-all">{user.email}</CardDescription></CardHeader>
              <CardContent><form action={signOut}><Button className="w-full" type="submit" variant="secondary"><LogOut aria-hidden="true" /> Sign out</Button></form></CardContent>
            </Card>
          </div>
        ) : (
          <Card className="max-w-lg"><CardHeader><CardTitle>Sign in to save your setup</CardTitle><CardDescription>Your first email sign-in creates the account. No password is needed.</CardDescription></CardHeader><CardContent><form action={sendLoginLink} className="grid gap-4"><label className="grid gap-2 text-sm font-medium">Email address<Input type="email" name="email" autoComplete="email" required /></label><Button type="submit" className="min-h-11 justify-self-start"><Mail aria-hidden="true" /> Email me a sign-in link</Button></form></CardContent></Card>
        )}
      </div>
    </main>
  );
}
