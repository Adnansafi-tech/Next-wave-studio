"use client";
import React, { useState } from "react";
import Accordion from "./accordion";
import { Heading } from "./heading";

const questions = [
  {
    id: 1,
    title: "What industries do you cater to?",
    description:
      "We serve all industries, including e-commerce, healthcare, education, and more.",
  },
  {
    id: 2,
    title: "How long does a project take?",
    description:
      "Project timelines vary based on complexity, typically ranging from 2 to 12 weeks.",
  },
  {
    id: 3,
    title: "Do you offer post-launch support?",
    description:
      "Yes, we provide comprehensive support and maintenance services.",
  },
  {
    id: 4,
    title: "Can you integrate AI into existing systems?",
    description: "Absolutely, we specialize in seamless AI integrations.",
  },
  {
    id: 5,
    title: "Are your apps compatible with all devices?",
    description:
      "Yes, our cross-platform solutions ensure compatibility across devices.",
  },
  {
    id: 6,
    title: "What technologies do you use?",
    description:
      "We use the latest technologies, including React, Node.js, Python, and more, depending on project requirements.",
  },
  {
    id: 7,
    title: "Can you build custom solutions?",
    description:
      "Yes, we excel in creating tailor-made solutions to meet unique business needs.",
  },
  {
    id: 8,
    title: "Do you handle design and development?",
    description:
      "Yes, we provide end-to-end services, including both design and development.",
  },
  {
    id: 9,
    title: "What is your pricing structure?",
    description:
      "Our pricing depends on the scope and complexity of the project. We offer flexible pricing tiers.",
  },
  {
    id: 10,
    title: "How do I get started with your services?",
    description:
      "Simply contact us through our website, and we’ll guide you through the onboarding process.",
  },
];

export const FAQs = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-3xl mx-auto py-20 px-8">
      <Heading className="pt-4">Frequently asked questions</Heading>
      <div className="grid  gap-10 pt-20">
        {questions.map((item, i) => (
          <Accordion
            key={i}
            i={i}
            expanded={expanded}
            setExpanded={setExpanded}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};
