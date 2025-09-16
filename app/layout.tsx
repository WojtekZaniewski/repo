import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat, Chivo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const chivo = Chivo({
  subsets: ["latin"],
  variable: "--font-chivo",
  display: "swap",
})

export const metadata: Metadata = {
  title: "LA PASSIONE — Luksusowy Salon Fryzjerski w Warszawie",
  description:
    "Odkryj luksusowy świat fryzjerstwa w LA PASSIONE. Profesjonalne strzyżenie, koloryzacja i stylizacja. Umów wizytę online i poczuj się wyjątkowo.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${montserrat.variable} ${chivo.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
