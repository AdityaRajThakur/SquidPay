import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { signIn } from "next-auth/react";
import type { DefaultSession, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & { id?: string | null };
  }
}

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });
            
            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }
            console.log("here " , existingUser); 
            try {
                const user = await db.user.create({
                    data: {
                        number: credentials.phone,
                        password: hashedPassword
                    }
                });
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number
                }
            } catch(e) {
                console.log("Error creating user: ", e); 
                console.error(e);
            }

            return null
          },
        })
    ],
    
    secret: process.env.JWT_SECRET ,
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: { token: JWT; session: Session }) {
            if (session && session.user) {
                session.user.id = token.sub ?? undefined;
            }
            return session
        }
    }
  }
  