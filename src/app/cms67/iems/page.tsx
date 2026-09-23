"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminApiError } from "@/features/admin/api";
import { useAdminMe } from "@/features/admin/hooks";
import { useAdminIems } from "@/features/admin/iem-hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function CmsIemsPage() {
    const router = useRouter();
    const me = useAdminMe();
    const list = useAdminIems(me.isSuccess);
    useEffect(() => { const error = me.error ?? list.error; if (error instanceof AdminApiError && error.status === 401) router.replace("/cms67"); }, [me.error, list.error, router]);
    if (me.isLoading || (me.isSuccess && list.isLoading)) return <p className="text-sm text-muted-foreground">Loading IEMs...</p>;
    if (me.isError || list.isError) return <p className="text-sm text-destructive" role="alert">Could not load IEMs.</p>;
    const rows = list.data?.iems ?? [];
    return <div className="space-y-6"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-hover">Catalog</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">IEMs</h2><p className="mt-1 text-sm text-muted-foreground">{rows.length} rows from the database</p></div><div className="flex gap-2"><Button variant="outline" size="sm" asChild><Link href="/cms67/dashboard">Dashboard</Link></Button><Button size="sm" asChild><Link href="/cms67/iems/new">Add IEM</Link></Button></div></div><div className="rounded-md border border-border/80 bg-card/50"><Table><TableHeader><TableRow><TableHead>Brand</TableHead><TableHead>Name</TableHead><TableHead>Slug</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{rows.length === 0 ? <TableRow><TableCell colSpan={5} className="text-muted-foreground">No IEMs yet. Run the IEM seed.</TableCell></TableRow> : rows.map((row) => <TableRow key={row.id}><TableCell className="font-medium">{row.brand}</TableCell><TableCell>{row.name}</TableCell><TableCell className="font-mono text-xs text-muted-foreground">{row.slug}</TableCell><TableCell><Badge variant={row.status === "published" ? "default" : "secondary"}>{row.status}</Badge></TableCell><TableCell className="text-right"><Button variant="ghost" size="sm" asChild><Link href={`/cms67/iems/${row.id}`}>Edit</Link></Button></TableCell></TableRow>)}</TableBody></Table></div></div>;
}