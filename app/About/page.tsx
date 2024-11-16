import React from "react";
import { Metadata } from "next";
import FunFact from "@/components/FunFact";
import CTA from "@/components/CTA";
import FeaturesTab from "@/components/FeaturesTab";
import FAQ from "@/components/FAQ";
import Feature from "@/components/Features";
import Features from "@/components/Features";

export const metadata: Metadata = {
  title: "Support Page - Solid SaaS Boilerplate",
  description: "This is Support page for Solid Pro",
  // other metadata
};

const SupportPage = () => {
  return (
    <div className="pb-20 pt-40">
      
      <FeaturesTab />
      <FAQ />
      <CTA />
    </div>
  );
};

export default SupportPage;
