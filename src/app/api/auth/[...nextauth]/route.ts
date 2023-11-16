import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";


import type { NextAuthOptions } from 'next-auth';
export const AuthOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Your Username"
                },
                password: {
                    label: "Password:",
                    type: "text"
                }
            },
            async authorize(credentials) {
                //TODO Docs: https://next-auth.js.org/connfiguration/providers/credentials
                const user = { id: "42", name: "Dave", password: "123456789"};

                if ( credentials?.username === user.name && credentials?.password === user.password){
                    return user;
                } else {
                    return null;
                }
            }
        })
    ]
}

const handler = NextAuth(AuthOptions)
export{ handler as GET, handler as POST}