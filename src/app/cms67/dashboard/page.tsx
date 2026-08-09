"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CmsDashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/admin/me", { credentials: "include" });
        if (!res.ok) {
          router.replace("/cms67");
          return;
        }
        const data = (await res.json()) as { email?: string };
        if (!cancelled) setEmail(data.email ?? null);
      } catch {
        router.replace("/cms67");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function logout() {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
    router.replace("/cms67");
  }

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground" aria-live="polite">
        Loading dashboard…
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-hover">
            CMS
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Signed in as {email ?? "admin"}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => void logout()}>
          Log out
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border border-border/80 bg-card/80">
          <CardHeader>
            <CardTitle>Mousepads</CardTitle>
            <CardDescription>
              Browse and edit catalog rows stored in Supabase.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/cms67/mousepads">Open mousepads</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-border/80 bg-card/80">
          <CardHeader>
            <CardTitle>Public site</CardTitle>
            <CardDescription>
              Preview how visitors see FragBasic.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <Link href="/">View site</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
