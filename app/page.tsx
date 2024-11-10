import { Metadata } from "next"
import Hero from "@/components/Hero"
import Feature from "@/components/Features"
import About from "@/components/About"
import Integration from "@/components/Integration"
import Testimonial from "@/components/Testimonial"
import Pricing from "@/components/Pricing"

export const metadata: Metadata = {
  title: "Next.js Starter Template for SaaS Startups - Solid SaaS Boilerplate",
  description: "This is Home for Solid Pro",
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Feature />
      <About />
      <Integration />
      <Pricing />
      <Testimonial />
    </main>
  )
}