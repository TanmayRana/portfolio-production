import { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { createTransport } from "nodemailer";

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db) as any,
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development_do_not_use_in_prod",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/admin/login',
    verifyRequest: '/admin/login/verify',
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      from: process.env.SMTP_USER || "admin@videoportfolio",
      generateVerificationToken() {
        return Math.floor(100000 + Math.random() * 900000).toString();
      },
      async sendVerificationRequest({ identifier: email, url, token, provider }) {
        if (email !== process.env.ADMIN_EMAIL) {
          throw new Error("Unauthorized email address");
        }
        
        const transport = createTransport(provider.server);
        const result = await transport.sendMail({
          to: email,
          from: provider.from,
          subject: `Admin Login OTP: ${token}`,
          text: `Your Admin Portal login code is: ${token}\n\nAlternatively, click here to log in: ${url}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px;">
              <h2>Admin Portal Login</h2>
              <p>Your one-time login code is:</p>
              <h1 style="letter-spacing: 4px; color: #333;">${token}</h1>
              <p>You can also <a href="${url}">click here</a> to sign in automatically.</p>
            </div>
          `
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, email }) {
      const emailToVerify = user?.email || (email as any)?.verificationRequest;
      if (emailToVerify === process.env.ADMIN_EMAIL || email?.verificationRequest) {
        return true;
      }
      return false;
    }
  }
};
