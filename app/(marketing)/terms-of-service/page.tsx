import { AmbientColor } from "@/components/ambient-color";
import { FeatureIconContainer } from "@/components/features/feature-icon-container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { IconReceiptFilled } from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms Of Services | Next Wave Studio | Software Development Agency",
  description:
    "Next Wave Studio is a software development agency that specializes in building web applications, mobile apps, websites, AI models, and more.",
  openGraph: {
    images: ["https://www.nextwavestudio.co/banner.png"],
  },
};


export default function TermsOfServicePage() {
  return (
    <div className="relative overflow-hidden">
      <AmbientColor />
      <div className="py-20 sm:py-40">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconReceiptFilled className="h-6 w-6 text-cyan-500" />
        </FeatureIconContainer>
        <Heading as="h1" className="mt-4">
          Terms of Service
        </Heading>
        <Subheading>
          Learn about the terms and conditions for using Proactiv.
        </Subheading>
        <div className="max-w-4xl mx-auto mt-10 text-center text-neutral-400">
          <p>
            Welcome to Proactiv! By using our services, you agree to the
            following terms and conditions.
          </p>
          <h3 className="mt-8 text-lg font-bold">Use of Services</h3>
          <ul className="ml-6 mt-2">
            <li>Use our platform only for lawful purposes.</li>
            <li>
              Refrain from activities that disrupt or harm our systems or
              services.
            </li>
          </ul>
          <h3 className="mt-8 text-lg font-bold">Intellectual Property</h3>
          <ul className="ml-6 mt-2">
            <li>
              All content, designs, and software on Proactiv are proprietary and
              owned by us.
            </li>
            <li>
              You may not copy, distribute, or modify our intellectual property
              without prior permission.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}