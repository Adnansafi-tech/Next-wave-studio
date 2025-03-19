import { AmbientColor } from "@/components/ambient-color";
import { FeatureIconContainer } from "@/components/features/feature-icon-container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { IconReceiptFilled } from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Next Wave Studio | Software Development Agency",
  description:
    "Next Wave Studio is a software development agency that specializes in building web applications, mobile apps, websites, AI models, and more.",
  openGraph: {
    images: ["https://www.nextwavestudio.co/banner.png"],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative overflow-hidden">
      <AmbientColor />
      <div className="py-20 sm:py-40">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconReceiptFilled className="h-6 w-6 text-cyan-500" />
        </FeatureIconContainer>
        <Heading as="h1" className="mt-4">
          Privacy Policy
        </Heading>
        <Subheading>
          Discover how we protect your data and ensure your privacy.
        </Subheading>
        <div className="max-w-4xl mx-auto mt-10 text-center text-neutral-400">
          <p>
            At Proactiv, we value your privacy and are committed to protecting
            your personal data. This Privacy Policy outlines how we collect,
            use, and safeguard your information.
          </p>
          <h3 className="mt-8 text-lg font-bold">Information We Collect</h3>
          <ul className="ml-6 mt-2">
            <li>Personal Information: Name, email, and contact details.</li>
            <li>
              Technical Information: IP address, browser type, and device
              details.
            </li>
          </ul>
          <h3 className="mt-8 text-lg font-bold">How We Use Your Information</h3>
          <ul className="ml-6 mt-2">
            <li>To provide and improve our services.</li>
            <li>To send updates and promotional content (with your consent).</li>
            <li>To enhance website functionality through analytics.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}