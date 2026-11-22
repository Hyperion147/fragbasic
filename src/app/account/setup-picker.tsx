"use client";

import { useState } from "react";
import { Check, ChevronRight, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { SetupCategory, SetupModel } from "@/features/setup-catalog/catalog";
import { normalizeSearchText } from "@/lib/search";

export const setupLabels: Record<SetupCategory, string> = {
  mouse: "Mouse", keyboard: "Keyboard", monitor: "Monitor", mousepad: "Mousepad", iem: "IEM",
};

const placeholders: Record<SetupCategory, string> = {
  mouse: "Search mice", keyboard: "Search keyboards", monitor: "Search monitors", mousepad: "Search mousepads", iem: "Search IEMs",
};

export function SetupPicker({ category, models, defaultValue }: { category: SetupCategory; models: SetupModel[]; defaultValue?: string }) {
  const [selected, setSelected] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const current = models.find((model) => model.id === selected);
  const label = setupLabels[category];

  return <div className="grid gap-2">
    <label id={`${category}-label`} className="text-sm font-medium">{label}</label>
    <input type="hidden" name={category} value={selected} />
    <Button type="button" variant="outline" className="h-auto min-h-12 w-full justify-between px-3 text-left" aria-labelledby={`${category}-label ${category}-value`} onClick={() => setOpen(true)}>
      <span id={`${category}-value`} className="min-w-0">
        {current ? <><span className="block truncate font-medium">{current.model}</span><span className="block truncate text-xs font-normal text-muted-foreground">{current.brand}</span></> : <span className="font-normal text-muted-foreground">{placeholders[category]}</span>}
      </span>
      <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground"><Search aria-hidden="true" className="size-4" /><ChevronRight aria-hidden="true" className="size-4" /></span>
    </Button>
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="border-b pr-14">
          <SheetTitle>Choose your {label.toLowerCase()}</SheetTitle>
          <SheetDescription>{models.length.toLocaleString()} models available. Type a brand or model and use the arrow keys to move.</SheetDescription>
        </SheetHeader>
        <Command filter={(value, search, keywords) => {
          const terms = normalizeSearchText(search).split(" ").filter(Boolean);
          const text = normalizeSearchText([value, ...(keywords ?? [])].join(" "));
          return terms.every((term) => text.includes(term)) ? 1 : 0;
        }}>
          <CommandInput autoFocus aria-label={`Search ${label.toLowerCase()} models`} placeholder={placeholders[category]} />
          <CommandList>
            <CommandItem value={`clear-${category}`} keywords={["none clear remove"]} onSelect={() => { setSelected(""); setOpen(false); }}>
              <span className="flex size-8 items-center justify-center rounded-md bg-muted"><X aria-hidden="true" className="size-4" /></span>
              <span>None selected</span>
              {!selected && <Check aria-hidden="true" className="ml-auto size-4" />}
            </CommandItem>
            {models.map((model) => <CommandItem key={model.id} value={model.id} keywords={[model.brand, model.model]} onSelect={() => { setSelected(model.id); setOpen(false); }}>
              <span className="min-w-0 flex-1"><span className="block truncate font-medium">{model.model}</span><span className="block truncate text-xs text-muted-foreground">{model.brand}</span></span>
              {selected === model.id && <Check aria-hidden="true" className="ml-auto size-4 shrink-0" />}
            </CommandItem>)}
            <CommandEmpty>No matching {label.toLowerCase()} found.</CommandEmpty>
          </CommandList>
        </Command>
      </SheetContent>
    </Sheet>
  </div>;
}
