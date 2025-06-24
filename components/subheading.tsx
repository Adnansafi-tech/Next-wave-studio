import { cn } from "@/lib/utils";
import { MotionProps } from "framer-motion";
import React, { ElementType, ReactNode } from "react";
import Balancer from "react-wrap-balancer";

type MergedProps = Omit<MotionProps, 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart' | 'style'>;

interface SubheadingProps extends MergedProps, React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  as?: ElementType;
  children: ReactNode;
}

export const Subheading: React.FC<SubheadingProps> = ({
  className,
  as: Tag = "h2",
  children,
  ...props
}) => {
  return (
    <Tag
      className={cn(
        "text-sm md:text-base max-w-4xl text-left my-4 mx-auto",
        "text-muted text-center font-normal dark:text-muted-dark",
        className
      )}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </Tag>
  );
};