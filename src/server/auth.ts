import { auth } from "@/auth";

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  if (session.user.role && session.user.role !== "admin") {
    return null;
  }

  return session;
}
