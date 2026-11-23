"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return <CommandPrimitive className={cn("flex min-h-0 flex-1 flex-col overflow-hidden", className)} {...props} />;
}

function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return <div className="flex items-center gap-2 border-b border-border px-4">
    <Search aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
    <CommandPrimitive.Input className={cn("h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground", className)} {...props} />
  </div>;
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return <CommandPrimitive.List className={cn("min-h-0 flex-1 overflow-y-auto p-2", className)} {...props} />;
}

function CommandEmpty(props: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty className="px-4 py-10 text-center text-sm text-muted-foreground" {...props} />;
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return <CommandPrimitive.Item className={cn("flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground", className)} {...props} />;
}

export { Command, CommandInput, CommandList, CommandEmpty, CommandItem };
