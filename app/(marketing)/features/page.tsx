import { AmbientColor } from "@/components/ambient-color";
import { CTA } from "@/components/cta";
import { Features } from "@/components/features";
import { FeaturesGrid } from "@/components/features/features-grid";
import { Testimonials } from "@/components/testimonials";
import { Tools } from "@/components/tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Next Wave Studio | Software Development Agency",
  description:
    "Next Wave Studio is a software development agency that specializes in building web applications, mobile apps, websites, AI models, and more.",
  openGraph: {
    images: ["https://www.nextwavestudio.co/banner.png"],
  },
};

export default function PricingPage() {
  return (
    <div className="relative overflow-hidden">
      <AmbientColor />
      <Tools />
      <Features />
      <FeaturesGrid />

      <div className="pb-40">
        <Testimonials />
      </div>
      <CTA />
    </div>
  );
}
