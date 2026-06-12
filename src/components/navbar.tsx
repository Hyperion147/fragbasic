import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const navItems = [
  { label: "Mousepads", href: "/mousepads" },
  { label: "Brands", href: "/brands/artisan" },
  { label: "Compare", href: "/compare" },
  { label: "Guides", href: "/guides" },
  { label: "Setup", href: "/setup" },
]

export function SiteNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-card">
            <span className="text-sm font-semibold text-primary">F</span>
          </div>

          <div className="leading-none">
            <p className="text-sm font-semibold tracking-tight">Fragpunk</p>
            <p className="text-xs text-muted-foreground">FPS gear lab</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" size="sm" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button size="sm" asChild>
            <Link href="/compare/universal">Compare pads</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-80">
              <div className="mt-8 space-y-6">
                <Link href="/" className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-card">
                    <span className="text-sm font-semibold text-primary">F</span>
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Fragpunk</p>
                    <p className="text-xs text-muted-foreground">
                      FPS gear lab
                    </p>
                  </div>
                </Link>

                <nav className="grid gap-2">
                  {navItems.map((item) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className="justify-start"
                      asChild
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </Button>
                  ))}
                </nav>

                <Button className="w-full" asChild>
                  <Link href="/compare/universal">Compare pads</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
