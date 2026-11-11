"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

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
import { fetchCatalogHealth } from "./catalog-health";

type Props = {
  compact?: boolean;
};

export function CatalogHealthPanel({ compact = false }: Props) {
  const query = useQuery({
    queryKey: ["admin", "catalog-health"],
    queryFn: fetchCatalogHealth,
    retry: false,
  });

  if (query.isLoading) {
    return (
      <div className="rounded-md border border-border/80 bg-card/50 p-4 text-sm text-muted-foreground">
        Checking catalog integrity...
      </div>
    );
  }

  if (query.isError || !query.data) {
    return (
      <div className="rounded-md border border-destructive/40 bg-card/50 p-4 text-sm text-destructive">
        Could not load catalog health.{" "}
        <button
          type="button"
          className="underline underline-offset-4"
          onClick={() => void query.refetch()}
        >
          Retry
        </button>
      </div>
    );
  }

  const report = query.data;
  const statusLabel = report.ok ? "Healthy" : `${report.totals.errors} errors`;

  return (
    <div className="space-y-4 rounded-md border border-border/80 bg-card/50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={report.ok ? "default" : "destructive"}>
            {statusLabel}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {report.totals.total} rows · {report.totals.published} published ·{" "}
            {report.totals.draft} draft
          </span>
          {report.totals.warnings > 0 ? (
            <Badge variant="secondary">
              {report.totals.warnings} warnings
            </Badge>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => void query.refetch()}
            disabled={query.isFetching}
          >
            {query.isFetching ? "Checking..." : "Re-check"}
          </Button>
          {compact ? (
            <Button variant="outline" size="sm" asChild>
              <Link href="/cms67/health">Open health</Link>
            </Button>
          ) : null}
        </div>
      </div>

      {compact ? (
        <div className="flex flex-wrap gap-2">
          {report.modules.map((module) => (
            <span
              key={module.module}
              className="rounded-full border border-border/70 px-2.5 py-1 text-xs text-muted-foreground"
            >
              {module.label}: {module.published}/{module.total}{" "}
              <span className="uppercase tracking-wide">{module.source}</span>
            </span>
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-border/70">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Published</TableHead>
                <TableHead className="text-right">Draft</TableHead>
                <TableHead className="text-right">Errors</TableHead>
                <TableHead className="text-right">Warnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report.modules.map((module) => (
                <TableRow key={module.module}>
                  <TableCell className="font-medium">{module.label}</TableCell>
                  <TableCell>
                    <Badge
                      variant={module.source === "db" ? "default" : "secondary"}
                    >
                      {module.source}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{module.total}</TableCell>
                  <TableCell className="text-right">
                    {module.published}
                  </TableCell>
                  <TableCell className="text-right">{module.draft}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        module.errorCount > 0 ? "text-destructive" : undefined
                      }
                    >
                      {module.errorCount}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {module.warningCount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {report.issues.length > 0 ? (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Issues
          </p>
          <ul className="space-y-2 text-sm">
            {(compact ? report.issues.slice(0, 3) : report.issues).map(
              (issue, index) => (
                <li key={`${issue.module}-${issue.slug ?? index}-${index}`}>
                  <span
                    className={
                      issue.level === "error"
                        ? "font-medium text-destructive"
                        : "font-medium text-amber-500"
                    }
                  >
                    {issue.level}
                  </span>{" "}
                  <span className="text-muted-foreground">
                    {issue.module}
                    {issue.slug ? ` · ${issue.slug}` : ""}:
                  </span>{" "}
                  {issue.message}
                </li>
              ),
            )}
          </ul>
          {compact && report.issues.length > 3 ? (
            <p className="text-xs text-muted-foreground">
              +{report.issues.length - 3} more issues on the health page.
            </p>
          ) : null}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          All rows, images, and references look valid.
        </p>
      )}

      {!compact ? (
        <p className="text-xs text-muted-foreground">
          Checked{" "}
          {new Date(report.checkedAt).toLocaleString()} · Source flags come from
          the current environment.
        </p>
      ) : null}
    </div>
  );
}
