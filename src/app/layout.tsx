import type { Metadata } from "next";
import "./globals.css";
import { Inter, Roboto_Mono, Sora } from "next/font/google";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "@/components/json-ld";
import { PublicChrome } from "@/components/public-chrome";
import { QueryProvider } from "@/components/providers/query-provider";
import {
    buildOrganizationJsonLd,
    buildWebsiteJsonLd,
    getRootMetadata,
} from "@/lib/seo";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = getRootMetadata();

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-inter",
});

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

const robotoMono = Roboto_Mono({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    variable: "--font-roboto-mono",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(
                "h-full",
                "antialiased",
                inter.variable,
                sora.variable,
                robotoMono.variable,
            )}
        >
            <body className="min-h-full flex flex-col" suppressHydrationWarning>
                <JsonLd data={buildWebsiteJsonLd()} />
                <JsonLd data={buildOrganizationJsonLd()} />
                {process.env.VERCEL === "1" && <>
                    <Analytics />
                    <SpeedInsights />
                </>}
                <QueryProvider>
                    <TooltipProvider>
                        <PublicChrome>{children}</PublicChrome>
                    </TooltipProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
