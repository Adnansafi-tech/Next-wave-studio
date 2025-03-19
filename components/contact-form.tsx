"use client";

import React, { Suspense } from "react";
import { Container } from "./container";
import { Heading } from "./heading";
import { Subheading } from "./subheading";
import { Button } from "./button";
import { Grid } from "./features/grid";
import { FeatureIconContainer } from "./features/feature-icon-container";
import { IconMailFilled } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";

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
    ]
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
  },
];

const ContactFormContent = () => {
  const searchParams = useSearchParams();
  const tier = searchParams.get('tier');

  const [form, setForm] = React.useState({
    name: '',
    email: '',
    company: '',
    service: tier || '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <Container className="py-40 md:py-60 grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
      <div>
        <div className="flex">
          <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
            <IconMailFilled className="h-6 w-6 text-cyan-500" />
          </FeatureIconContainer>
        </div>
        <Heading className="text-left">Contact us</Heading>
        <Subheading className="text-left text-neutral-400">
          We are always looking for ways to improve our products and services.
          Contact us and let us know how we can help you.
        </Subheading>

        <div className="text-sm mt-10">
          <p className="text-sm text-neutral-200">Email</p>
          <p className="text-sm text-neutral-400">contact@nextwavestudio.co</p>
        </div>
        <div className="text-sm mt-4">
          <p className="text-sm text-neutral-200">Phone</p>
          <p className="text-sm text-neutral-400">+93 (78) 055 2609</p>
        </div>
        <div className="text-sm mt-4">
          <p className="text-sm text-neutral-200">WhatsApp</p>
          <p className="text-sm text-neutral-400">+93 (78) 055 2609</p>
        </div>
        <div className="text-sm mt-4">
          <p className="text-sm text-neutral-200">Support</p>
          <p className="text-sm text-neutral-400">support@nextwavestudio.co</p>
        </div>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col items-start gap-4 max-w-2xl w-full mx-auto bg-gradient-to-b from-neutral-900 to-neutral-950 p-10 rounded-3xl relative overflow-hidden">
        <Grid size={20} />
        <div className="mb-4 w-full relative z-20">
          <label
            className="text-neutral-300 text-sm font-medium mb-2 inline-block"
            htmlFor="name"
          >
            Full name
          </label>
          <input
            id="name"
            type="text"
            onChange={handleChange}
            placeholder="Jon Doe"
            className="h-10 pl-4 w-full rounded-md text-sm bg-charcoal border border-neutral-800 text-white placeholder-neutral-500 outline-none focus:outline-none active:outline-none focus:ring-2 focus:ring-neutral-800"
          />
        </div>
        <div className="mb-4 w-full relative z-20">
          <label
            className="text-neutral-300 text-sm font-medium mb-2 inline-block"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            onChange={handleChange}
            placeholder="contact@example.com"
            className="h-10 pl-4 w-full rounded-md text-sm bg-charcoal border border-neutral-800 text-white placeholder-neutral-500 outline-none focus:outline-none active:outline-none focus:ring-2 focus:ring-neutral-800"
          />
        </div>
        <div className="mb-4 w-full relative z-20">
          <label
            className="text-neutral-300 text-sm font-medium mb-2 inline-block"
            htmlFor="company"
          >
            Company
          </label>
          <input
            id="company"
            type="text"
            placeholder="example pvt. ltd."
            onChange={handleChange}
            className="h-10 pl-4 w-full rounded-md text-sm bg-charcoal border border-neutral-800 text-white placeholder-neutral-500 outline-none focus:outline-none active:outline-none focus:ring-2 focus:ring-neutral-800"
          />
        </div>
        <div className="mb-4 w-full relative z-20">
          <label className="text-neutral-300 text-sm font-medium mb-2 inline-block" htmlFor="service">
            Service Type
          </label>
          <select
            id="service"
            onChange={handleChange}
            value={form.service}
            className="h-10 pl-4 w-full rounded-md text-sm bg-charcoal border border-neutral-800 text-white outline-none focus:outline-none active:outline-none focus:ring-2 focus:ring-neutral-800 appearance-none"
            style={{
              background: `url("data:image/svg+xml,<svg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1 1L6 6L11 1' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>") no-repeat right 1rem center`,
              backgroundColor: 'rgb(29, 29, 31)'
            }}
          >
            <option value="" disabled>Select a service type</option>
            {tiers.map(tier => (
              <option key={tier.id} value={tier.title.toLowerCase()}>{tier.title}</option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full relative z-20">
          <label
            className="text-neutral-300 text-sm font-medium mb-2 inline-block"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            onChange={handleChange}
            placeholder="Type your message here"
            className="pl-4 pt-4 w-full rounded-md text-sm bg-charcoal border border-neutral-800 text-white placeholder-neutral-500 outline-none focus:outline-none active:outline-none focus:ring-2 focus:ring-neutral-800"
          />
        </div>
        <Button variant="muted">Submit</Button>
      </form>
    </Container>
  );
};

export const ContactForm = () => {
  return (
    <Suspense fallback={
      <Container className="py-40 md:py-60">
        <div className="animate-pulse bg-neutral-800 h-96 rounded-3xl" />
      </Container>
    }>
      <ContactFormContent />
    </Suspense>
  );
};