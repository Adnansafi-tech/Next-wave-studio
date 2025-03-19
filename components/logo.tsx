import { Link } from "next-view-transitions";
import Image from "next/image";
import React from "react";

export const Logo = ({ scale = 1 }: { scale?: number }) => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm mr-4 mb-2 text-black px-2 py-0 relative z-20"
    >
      <Image
        src="/logo.png"
        width={160 * scale}
        height={10 * scale}
        alt="Next Wave Studio Logo"
      />
    </Link>
  );
};
