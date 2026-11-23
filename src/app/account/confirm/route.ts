import { NextResponse, type NextRequest } from "next/server";
import { accountClient } from "@/server/account/client";
import { accountOrigin } from "@/server/account/config";

export async function GET(request: NextRequest) {
  const client = await accountClient(true);
  const code = request.nextUrl.searchParams.get("code");
  const destination = new URL("/account", accountOrigin());
  if (!client || !code || (await client.auth.exchangeCodeForSession(code)).error) {
    destination.searchParams.set("notice", "expired");
  }
  const response = NextResponse.redirect(destination, 303);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}
