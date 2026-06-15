import type { Metadata } from "next";
import "./globals.css";
import { Inter, Roboto_Mono, Sora } from "next/font/google"
import { cn } from "@/lib/utils"
import { SiteNavbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { Analytics } from "@vercel/analytics/next";
import { getRootMetadata } from "@/lib/seo";

export const metadata: Metadata = getRootMetadata();

const inter = Inter({ subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'vietnamese'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], variable: '--font-inter' });

const sora = Sora({ subsets: ['latin', 'latin-ext'], variable: '--font-sora' });

const robotoMono = Roboto_Mono({ subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'vietnamese'], weight: ['100', '200', '300', '400', '500', '600', '700'], variable: '--font-roboto-mono' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, sora.variable, robotoMono.variable)}
    >
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        <Analytics />
        <SiteNavbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
