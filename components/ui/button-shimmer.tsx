"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

interface ButtonProps {
    path: string;
    label: string;
}

const NavigationButtonShimmer: React.FC<ButtonProps> = ({ path, label }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(path);
    };

    return (
        <button
            onClick={handleClick}
            className="inline-flex h-12 mr-5 animate-shimmer items-center justify-center rounded-md border border-neutral-900 bg-[linear-gradient(110deg,#000,45%,#1e2631,55%,#000)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:opacity-60 focus:transition focus:ease-in z-50">
            {label}
        </button>
    );
};

export { NavigationButtonShimmer }