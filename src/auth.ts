import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const credentialsSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
    trustHost: true,
    providers: [
        Credentials({
            name: "Admin",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(raw) {
                const parsed = credentialsSchema.safeParse({
                    email:
                        typeof raw?.email === "string" ? raw.email.trim() : raw?.email,
                    password:
                        typeof raw?.password === "string"
                            ? raw.password
                            : raw?.password,
                });
                if (!parsed.success) return null;

                const { getAdminCredentials } = await import(
                    "@/server/admin-credentials"
                );
                const creds = getAdminCredentials();
                if (!creds.ok) {
                    console.error("[auth]", creds.message);
                    return null;
                }

                const { email, password } = parsed.data;
                const emailOk =
                    email.toLowerCase() === creds.email.toLowerCase();
                const passOk = await bcrypt.compare(password, creds.hash);
                if (!emailOk || !passOk) return null;

                return {
                    id: "admin",
                    email: creds.email,
                    role: "admin",
                };
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },
    pages: {},
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as { role?: string }).role ?? "admin";
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as { role?: string }).role = token.role as string;
            }
            return session;
        },
    },
});
