import { AmbientColor } from "@/components/ambient-color";
import { FeatureIconContainer } from "@/components/features/feature-icon-container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { IconReceiptFilled } from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refun Policy | Next Wave Studio | Software Development Agency",
  description:
    "Next Wave Studio is a software development agency that specializes in building web applications, mobile apps, websites, AI models, and more.",
  openGraph: {
    images: ["https://www.nextwavestudio.co/banner.png"],
  },
};


export default function RefundPolicyPage() {
  return (
    <div className="relative overflow-hidden">
      <AmbientColor />
      <div className="py-20 sm:py-40">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconReceiptFilled className="h-6 w-6 text-cyan-500" />
        </FeatureIconContainer>
        <Heading as="h1" className="mt-4">
          Refund Policy
        </Heading>
        <Subheading>
          Learn about our refund process and eligibility criteria.
        </Subheading>
        <div className="max-w-4xl mx-auto mt-10 text-center text-neutral-400">
          <p>
            At Proactiv, we strive to provide the best possible service. Our
            refund policy ensures transparency and fairness for all our clients.
          </p>
          <h3 className="mt-8 text-lg font-bold">Eligibility for Refunds</h3>
          <ul className="ml-6 mt-2">
            <li>
              Refunds are applicable for cancellations made before project
              initiation.
            </li>
            <li>
              If we fail to deliver the agreed-upon services, a partial or full
              refund may be issued.
            </li>
          </ul>
          <h3 className="mt-8 text-lg font-bold">Non-Refundable Conditions</h3>
          <ul className="ml-6 mt-2">
            <li>Completed services where deliverables have been met.</li>
            <li>
              Cancellations made after significant progress on the project.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}