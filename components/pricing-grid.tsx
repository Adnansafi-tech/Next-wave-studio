"use client";

import React, { useState } from "react";
import { Container } from "./container";
import { IconCheck } from "@tabler/icons-react";
import { CustomLink } from "./custom-link";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import Balancer from "react-wrap-balancer";
import Beam from "./beam";
import { useRouter } from "next/navigation";

export const PricingGrid = () => {
  const router = useRouter();

  const tiers = [
    {
      id: "basic",
      title: "Basic",
      description: "Perfect for simple websites.",
      features: [
        "Responsive design",
        "SEO-optimized pages",
        "Basic hosting and domain setup",
        "Integration with Google Analytics",
      ],
      ctaText: "Get Started",
      onClick: () => router.push('/contact'),
    },
    {
      id: "standard",
      title: "Standard",
      description: "Dynamic websites with advanced features.",
      features: [
        "Everything in Basic +",
        "Custom CMS for content updates",
        "Dynamic and interactive features",
        "Basic e-commerce integration"
      ],
      ctaText: "Get Started",
      onClick: () => router.push('/contact'),
    },
    {
      id: "advanced",
      title: "Advanced",
      description: "Full-stack web apps for growing businesses.",
      features: [
        "Everything in Standard +",
        "Custom backend with scalable APIs",
        "Real-time features like chat and notifications",
        "Advanced security and data protection",
        "Cross-platform compatibility",
        "Priority support",
      ],
      featured: true,
      ctaText: "Contact Us",
      onClick: () => router.push('/contact'),
    },
    {
      id: "enterprise",
      title: "Enterprise",
      description: "Comprehensive solutions for large-scale needs.",
      features: [
        "Everything in Advanced +",
        "Custom AI and machine learning solutions",
        "HIPAA and SOC2 compliance",
        "Bulk email and data processing",
        "Customizable dashboards and analytics",
        "24/7 dedicated support",
      ],
      ctaText: "Book a Demo",
      onClick: () => router.push('/contact'),
    },
  ];

  return (
    <div>
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-4 py-20">
        {tiers.map((tier, index) => (
          <div
            key={tier.title + index}
            className={cn(
              "flex flex-col justify-between items-start px-6 py-4 rounded-lg relative overflow-hidden",
              tier.featured &&
              "bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neutral-900 to-neutral-950"
            )}
          >
            {tier.featured && <Beam showBeam className="top-0 block" />}
            <div>
              <h3 className="text-base font-normal">{tier.title}</h3>
              <p className="text-lg text-neutral-400 mt-4 font-medium">
                Custom Pricing
              </p>
              <p className="text-sm text-neutral-400 mt-4">
                {tier.description}
              </p>
              <div className="mt-4">
                {tier.features.map((feature, idx) => (
                  <Step key={`feature-${index}-${idx}`}>{feature}</Step>
                ))}
              </div>
            </div>
            <Button
              variant={tier.featured ? "primary" : "muted"}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                router.push(`/contact?tier=${tier.id}`);
              }}
              className="mt-4"
            >
              {tier.ctaText}
            </Button>
          </div>
        ))}
      </Container>
    </div>
  );
};

const Step = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-2 items-start my-4">
      <IconCheck className="h-4 w-4 text-neutral-300 mt-0.5" />
      <div className="text-sm text-neutral-400">
        <Balancer>{children}</Balancer>
      </div>
    </div>
  );
};