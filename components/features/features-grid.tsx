import React from "react";
import { Grid } from "./grid";

export const FeaturesGrid = () => {
  const grid = [
    {
      title: "Scalable Architecture",
      description:
        "Build dynamic systems designed to grow with your business, ensuring flexibility and reliability at every stage.",
    },
    {
      title: "User-Centric Design",
      description:
        "Craft intuitive and visually appealing interfaces that prioritize user experience and engagement.",
    },
    {
      title: "HIPAA and SOC2 Compliance",
      description:
        "Deliver secure, compliant solutions that meet the highest standards for data privacy and protection.",
    },
    {
      title: "Advanced Analytics",
      description:
        "Empower decision-making with actionable insights through detailed data visualization and reporting tools.",
    },
    {
      title: "Fast and Reliable Systems",
      description:
        "Ensure performance and reliability with optimized systems that deliver consistent uptime and responsiveness.",
    },
    {
      title: "AI-Driven Personalization",
      description:
        "Leverage AI to provide personalized experiences tailored to individual user needs and preferences.",
    },
    {
      title: "Robust Data Security",
      description:
        "Protect your data with enterprise-grade security measures, including encryption and real-time threat monitoring.",
    },
    {
      title: "Cross-Device Compatibility",
      description:
        "Deliver consistent experiences across desktops, tablets, and mobile devices with responsive design and functionality.",
    },
  ];
  return (
    <div className="py-20 lg:py-40">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {grid.map((feature, idx) => (
          <div
            key={feature.title}
            className="relative bg-gradient-to-b from-neutral-900 to-neutral-950 p-6 rounded-3xl overflow-hidden"
          >
            <Grid size={20} />
            <p className="text-base font-bold text-white relative z-20">
              {feature.title}
            </p>
            <p className="text-neutral-400 mt-4 text-base font-normal relative z-20">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
