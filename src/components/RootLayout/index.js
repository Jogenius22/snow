import { Suspense } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Next.js 13 + PlanetScale + NextAuth + Tailwind CSS",
  description:
    "A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier."
}

export default function RootLayout({ children }) {
  return (
    <>
      <Suspense fallback="Chargement ...">
        <Navbar />
      </Suspense>
        {children}
      <Footer />
    </>
  )
}
