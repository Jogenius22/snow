import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongooseAdapter } from "@choutkamartin/mongoose-adapter"
import axios from "axios"

export default NextAuth({
  secret: process.env.JWT_SECRET,

  adapter: MongooseAdapter(`${process.env.MONGODB_URI}/Utilisateur`),

  providers: [
    CredentialsProvider({
      name: "Snowfus",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials;
        const response = await axios.post("http://localhost:3000/api/user/login", {
          username,
          password,
        })
        console.log("Login response: ",response.data)
        console.log("Login response status: ",response.status)
      
        if (response.status === 200 && response.data) {
          const user = response.data.user
          return Promise.resolve(user)
        } else {
          return null
        }
      },      
    }),
  ],
  
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
  
  cookies: {
    secure: true,
    domain: process.env.NODE_ENV === "production" ? "votredomaine.com" : "localhost",
  },  
  
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback called")
      if (user) {
        token = {
          ...token,
          sub: user._id,
          name: user.username,
          email: user.email,
          picture: user.image
        }
      }
      console.log("JWT:", token)
      return token
    },
    async session({ session, token }) {
      console.log("Session callback called")
      session.user = token
      console.log("Session:", session)
      return session
    },    
  },
  
  session: {
    jwt: true,
    maxAge: 60 * 60 * 24 * 30,
    updateAge: 24 * 60 * 60, // 24 heures
  },

  pages: {
    signIn: '/auth/signin',
  }
})
