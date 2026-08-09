"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AdminApiError } from "@/features/admin/api";
import { useAdminMe, useAdminMousepads } from "@/features/admin/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CmsMousepadsPage() {
  const router = useRouter();
  const me = useAdminMe();
  const list = useAdminMousepads(me.isSuccess);

  useEffect(() => {
    if (me.isError) {
      const err = me.error;
      if (err instanceof AdminApiError && err.status === 401) {
        router.replace("/cms67");
      }
    }
  }, [me.isError, me.error, router]);

  useEffect(() => {
    if (list.isError) {
      const err = list.error;
      if (err instanceof AdminApiError && err.status === 401) {
        router.replace("/cms67");
      }
    }
  }, [list.isError, list.error, router]);

  if (me.isLoading || (me.isSuccess && list.isLoading)) {
    return (
      <p className="text-sm text-muted-foreground" aria-live="polite">
        Loading mousepads…
      </p>
    );
  }

  if (me.isError && !(me.error instanceof AdminApiError && me.error.status === 401)) {
    return (
      <p className="text-sm text-destructive" role="alert">
        Could not verify session.
      </p>
    );
  }

  if (list.isError) {
    const message =
      list.error instanceof Error ? list.error.message : "Failed to load";
    return (
      <p className="text-sm text-destructive" role="alert">
        {message}
      </p>
    );
  }

  const rows = list.data?.mousepads ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-hover">
            Catalog
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Mousepads
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {rows.length} rows from Supabase
            {me.data?.email ? ` · ${me.data.email}` : null}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/cms67/dashboard">Dashboard</Link>
          </Button>
          {/* Enable when you build create */}
          {/* <Button size="sm" asChild>
            <Link href="/cms67/mousepads/new">Add mousepad</Link>
          </Button> */}
        </div>
      </div>

      <div className="rounded-md border border-border/80 bg-card/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brand</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-muted-foreground">
                  No mousepads yet. Run seed or create one.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.brand}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {row.slug}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        row.status === "published" ? "default" : "secondary"
                      }
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/cms67/mousepads/${row.id}`}>Edit</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}