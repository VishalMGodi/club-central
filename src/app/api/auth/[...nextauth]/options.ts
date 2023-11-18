import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";

import type { NextAuthOptions } from 'next-auth';
import axios from 'axios';

var githubProvider = GitHubProvider({
    clientId: process.env.GITHUB_ID as string,
    clientSecret: process.env.GITHUB_SECRET as string,
});

var googleProvider = GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
    }
})

var credentialsProvider = CredentialsProvider({
    name: "Credentials",
    credentials: {
        username: {
            label: "Username:",
            type: "text",
            placeholder: "Your Username"
        },
        email: {
            label: "Email:",
            type: "text",
            placeholder: "Your Email"
        },

        password: {
            label: "Password:",
            type: "text",
            placeholder: "Your Password"
        },
        // dob:{
        //     label: "Date :",
        //     type: "text",
        //     placeholder: "Your Date of Birth"
        // },
    },
    async authorize(credentials) {
        const user = { id: "42", name: "Dave", password: "123456789"};
        console.log("options.ts", "authorize", credentials)
        var validate = await axios.get("http://localhost:4000/checkUser/", { params: {
            username: credentials?.username,
            email: credentials?.email,
            password: credentials?.password
        }})
        console.log(validate.data)
        if (validate.data.length && credentials!==undefined) return validate.data ;//credentials
        else return null

        //TODO Docs: https://next-auth.js.org/connfiguration/providers/credentials


        if ( credentials?.username === user.name && credentials?.password === user.password){
            return user;
        } else {
            return null;
        }
    }
})
export const AuthOptions: NextAuthOptions = {
    pages: {
        signIn: '/api/auth/signIn' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    providers: [ githubProvider, googleProvider, credentialsProvider ],
    // callbacks: {
    //     async signIn({ account, profile }) {
    //       if (account.provider === "google") {
    //         return profile.email_verified && profile.email.endsWith("@example.com")
    //       }
    //       return true // Do different verification for other providers that don't have `email_verified`
    //     },
    //   }
}