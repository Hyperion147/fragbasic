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
                const parsed = credentialsSchema.safeParse(raw);
                if (!parsed.success) return null;

                const adminEmail = process.env.ADMIN_EMAIL;
                const hash = process.env.ADMIN_PASSWORD_HASH;
                if (!adminEmail || !hash) return null;

                const { email, password } = parsed.data;
                const emailOk =
                    email.toLowerCase() === adminEmail.toLowerCase();
                const passOk = await bcrypt.compare(password, hash);
                if (!emailOk || !passOk) return null;

                return {
                    id: "admin",
                    email: adminEmail,
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
