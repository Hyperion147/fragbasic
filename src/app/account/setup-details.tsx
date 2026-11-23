import Link from "next/link";
import { ExternalLink, Headphones, Keyboard, Monitor, Mouse, PanelsTopLeft, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SETUP_CATEGORIES, SETUP_LABELS } from "@/features/setup-catalog/fields";
import type { AccountSetup } from "@/server/account/setups";

const gearIcons = { mouse: Mouse, keyboard: Keyboard, monitor: Monitor, mousepad: PanelsTopLeft, iem: Headphones };

function GearLink({ source, children }: { source: string; children: React.ReactNode }) {
  if (source.startsWith("/")) return <Link href={source} className="inline-flex items-center gap-1 text-sm font-medium hover:underline">{children}</Link>;
  return <a href={source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium hover:underline">{children}<ExternalLink aria-hidden="true" className="size-3.5" /></a>;
}

export function SetupDetails({ setup, editable = true }: { setup: AccountSetup; editable?: boolean }) {
  return <Card>
    <CardHeader className="border-b">
      <div className="flex flex-wrap items-center gap-2"><CardTitle className="text-xl">{setup.name}</CardTitle><Badge variant="outline" className="capitalize">{setup.visibility}</Badge></div>
      <CardDescription>{Object.keys(setup.gear).length} of {SETUP_CATEGORIES.length} gear positions completed</CardDescription>
      {editable && <CardAction><Button asChild variant="outline"><Link href={`/account?setup=${setup.id}&edit=setup`}><Pencil aria-hidden="true" /> Edit setup</Link></Button></CardAction>}
    </CardHeader>
    <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {SETUP_CATEGORIES.map(category => {
        const Icon = gearIcons[category];
        const gear = setup.gear[category];
        return <div key={category} className="flex min-h-28 gap-3 rounded-md border border-border bg-background/60 p-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"><Icon aria-hidden="true" className="size-4" /></span>
          <div className="min-w-0"><p className="text-xs font-medium text-muted-foreground">{SETUP_LABELS[category]}</p>{gear ? <><p className="mt-1 truncate text-xs text-muted-foreground">{gear.brand}</p><GearLink source={gear.source}>{gear.model}</GearLink></> : <p className="mt-2 text-sm text-muted-foreground">Not added</p>}</div>
        </div>;
      })}
    </CardContent>
  </Card>;
}
