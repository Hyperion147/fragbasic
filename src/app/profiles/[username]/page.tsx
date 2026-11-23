import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AtSign, UserRound } from "lucide-react";
import { SetupDetails } from "@/app/account/setup-details";
import { SiteBreadcrumbs } from "@/components/site-breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicAccountProfile } from "@/server/account/setups";

async function publicProfile(username: string) {
  if (!/^[a-z0-9_]{3,30}$/.test(username)) return null;
  return getPublicAccountProfile(username);
}

export async function generateMetadata({ params }: PageProps<"/profiles/[username]">): Promise<Metadata> {
  const { username } = await params;
  const account = await publicProfile(username);
  if (!account) return { title: "Profile not found", robots: { index: false, follow: false } };
  const name = account.profile.displayName || `@${account.profile.username}`;
  return { title: `${name}'s gaming setup`, description: account.profile.bio || `See ${name}'s peripherals and saved setups on FragBasic.` };
}

export default async function PublicProfilePage({ params }: PageProps<"/profiles/[username]">) {
  const { username } = await params;
  const account = await publicProfile(username);
  if (!account) notFound();
  return <main className="min-h-[60vh]">
    <div className="page-hero">
      <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Profiles" }, { label: `@${username}` }]} />
      <div className="flex items-start gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-border bg-card"><UserRound aria-hidden="true" className="size-6 text-muted-foreground" /></span>
        <div className="min-w-0"><h1 className="page-title">{account.profile.displayName || `@${username}`}</h1><p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><AtSign aria-hidden="true" className="size-4" />{username}</p>{account.profile.bio && <p className="mt-3 max-w-2xl text-muted-foreground">{account.profile.bio}</p>}</div>
      </div>
    </div>
    <div className="page-section grid gap-6">
      {account.setups.length ? account.setups.map(setup => <SetupDetails key={setup.id} setup={setup} editable={false} />) : <Card><CardHeader><CardTitle>No public setups yet</CardTitle><CardDescription>This profile has not published a setup.</CardDescription></CardHeader><CardContent /></Card>}
    </div>
  </main>;
}
