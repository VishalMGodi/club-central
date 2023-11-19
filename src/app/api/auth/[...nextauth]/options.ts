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
        // const user = { id: "42", name: "Dave", password: "123456789"};
        console.log("options.ts", "authorize", credentials)
        var validate = await axios.get("http://localhost:4000/checkUser/", { params: {
            username: credentials?.username,
            email: credentials?.email,
            password: credentials?.password
        }})
        console.log("validation", validate.data, validate.data[0])
        // alert(validate.data)
        if (validate.data.length && credentials!==undefined){
            const user = validate.data[0]
            return {
                name:  user.username,
                email:  user.user_id,
                id: user.user_id,
                image: user.user_id,
            }
        }else return null

        // Docs: https://next-auth.js.org/connfiguration/providers/credentials
    }
})
export const AuthOptions: NextAuthOptions = {
    pages: { signIn: '/api/auth/signIn' },
    providers: [ githubProvider, googleProvider, credentialsProvider ],
    callbacks: {
        async session({ session, token, user }){
            console.log("CALBAK sess", session, token, user)
            // if(!session.id){
            //     const user = session.user
            //     var validate = await axios.get("http://localhost:4000/checkUser/", { params: { email: user?.email, google: true } })
            //     if (validate && validate.data && validate.data.length ){
            //         session.id = validate.data[0].user_id;
            //         session.user.name = validate.data[0].username;
            //     }
            // }
            // session.id = token.sub
            return Promise.resolve(session);
        },
        async signIn({ account, profile }) {
            console.log("CALBAK sigIn", account, profile, "====================")
            if (account?.provider === "google") {
                var validate = await axios.get("http://localhost:4000/checkUser/", { params: { email: profile?.email, google: true } })
                console.log(validate.data, "-----------------------------------")
                if (validate && validate.data && validate.data.length ){
                    // return true
                    const user = validate.data[0]
                    console.log(user)
                    profile.name = user.username;
                    profile.sub = user.user_id;
                    return true
                    // return {
                    //     name:  user.username,
                    //     email:  user.email,
                    //     id: user.user_id,
                    // }
                }else return false
            }
            return true // Do different verification for other providers that don't have `email_verified`
        },
    }
}