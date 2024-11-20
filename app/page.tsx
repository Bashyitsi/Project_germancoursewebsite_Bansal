import { Metadata } from "next"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Integration from "@/components/Integration"
import Testimonial from "@/components/Testimonial"
import Pricing from "@/components/Pricing"
import FunFact from "@/components/FunFact"
import Features from "@/components/Features"
import FAQ from "@/components/FAQ"

export const metadata: Metadata = {
  title: "Kigali Deutsch connect academy",
  description: "This is Home for language learning",
  verification: {
    google: "gCkABGzWMStG5RIVh3CGlhnseXjmHjYcWhRvZnLNT0E"
  }
}

export default function Home() {
  return (
    <main>
      <Hero />
      <FunFact />
      <About />
      <Testimonial />
      <Pricing />
      <Integration />
      <Features />
      <FAQ />
    </main>
  )
}