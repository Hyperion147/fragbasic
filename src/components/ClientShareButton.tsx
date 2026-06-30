"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { IconTooltip } from "@/components/ui/tooltip";

export function ClientShareButton({
  href,
  label = "Share",
  iconOnly = false,
}: {
  href: string;
  label?: string;
  iconOnly?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}${href}`;
    try {
      if (navigator.share) {
        await navigator.share({ url });
      } else {
        await navigator.clipboard.writeText(url);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      } catch {}
    }
  };

  const tooltip = copied ? "Link copied" : label;

  if (iconOnly) {
    return (
      <IconTooltip label={tooltip}>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={handleShare}
          aria-label={tooltip}
        >
          <Copy className="size-4" />
        </Button>
      </IconTooltip>
    );
  }

  return (
    <Button variant="outline" onClick={handleShare} className="gap-2" aria-label={tooltip}>
      <Copy className="size-4" />
      {copied ? "Link ready" : label}
    </Button>
  );
}
