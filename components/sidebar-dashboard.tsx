"use client";

import { Navlink } from "@/types/navlink";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import { IconLayoutSidebarRightCollapse } from "@tabler/icons-react";
import { navlinksDashboard } from "@/constants/navlink-dashboard";
import { useDispatch, useSelector } from "react-redux";
import { UserData } from "@/services/types/type";
import { ComponentKey } from "./dashboard-components";
import { Button } from "./Button";
import { AppDispatch } from "@/features/Store";
import { logout } from "@/features/auth/authSlice";
import { logoutGeneral } from "@/features/general/generalSlice";
import storageService from "@/services/storage-service";
import { useRouter } from "next/navigation";

const isMobile = () => {
    if (typeof window === "undefined") return false;
    const width = window.innerWidth;
    return width <= 1024;
};

interface AuthState {
    token: string | null;
    userData: UserData;
}

export const SidebarDashboard = ({ setSelectedLink, selectedLink, className }: {
    selectedLink: ComponentKey;
    setSelectedLink: React.Dispatch<React.SetStateAction<ComponentKey>>;
    className?: string;
}) => {
    const [open, setOpen] = useState(isMobile() ? false : true);

    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ x: -200 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.2, ease: "linear" }}
                        exit={{ x: -200 }}
                        className={twMerge(
                            "px-6 rounded-3xl py-10 bg-neutral-100 dark:bg-neutral-900 lg:w-[20%] border-r border-neutral-200/[0.8] h-[98vh] top-[1vh] left-3 lg:flex flex-col justify-between max-w-[14rem]",
                            className
                        )}
                    >
                        <div className="">
                            <SidebarHeader />
                            <Navigation setOpen={setOpen} setSelectedLink={setSelectedLink} selectedLink={selectedLink} />
                        </div>
                        <div className="flex flex-col space-y-2 items-start">
                            <SidebarFooter />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                className="fixed lg:hidden bottom-4 right-4 h-8 w-8 border border-neutral-200 dark:bg-neutral-600 rounded-full backdrop-blur-sm flex items-center justify-center"
                onClick={() => setOpen(!open)}
            >
                <IconLayoutSidebarRightCollapse className="h-4 w-4 text-neutral-800 dark:text-neutral-200" />
            </button>
        </>
    );
};

export const Navigation = ({
    setOpen,
    setSelectedLink,
    selectedLink
}: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedLink: React.Dispatch<React.SetStateAction<ComponentKey>>;
    selectedLink: ComponentKey;
}) => {
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;

    return (
        <div className="flex flex-col space-y-1 md:my-0 my-2 relative z-[20]">
            {navlinksDashboard.map((link: Navlink) => (
                <div
                    key={link.href}
                    onClick={() => {
                        if (link.clickable === false) {
                            return
                        } else {
                            isMobile() && setOpen(false);
                            setSelectedLink(link.href as ComponentKey);
                        }
                    }}
                    className={twMerge(
                        "group hover:text-neutral-950 hover:bg-neutral-200 hover:rounded-md hover:drop-shadow-md dark:text-neutral-300 text-neutral-800 dark:hover:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:drop-shadow-xl hover:px-0.5 transition ease-in-out duration-1000 flex items-center space-x-2 p-1 md:p-1.5 lg:p-2 rounded-md text-xs md:text-sm lg:text-m",
                        selectedLink === link.href ? "group text-neutral-950 bg-neutral-200 rounded-md drop-shadow-md  dark:text-neutral-200 dark:bg-neutral-800 dark:drop-shadow-xl px-0.5" : ""
                    )}
                >
                    <div
                        className={twMerge("flex items-center justify-center w-8 h-8 rounded-md drop-shadow-md group-hover:drop-shadow-none bg-neutral-200 dark:bg-neutral-800 transition-colors duration-400",
                            selectedLink === link.href ? "group-hover:drop-shadow-none" : ""
                        )}
                    >
                        <link.icon
                            className={twMerge(
                                "h-4 w-4 flex-shrink-0",
                                isActive(link.href) && "text-primary"
                            )}
                        />
                    </div>
                    <span>{link.label}</span>
                </div>
            ))}
        </div>
    );
};

const SidebarHeader = () => {

    const { userData } = useSelector<{ general: AuthState }, AuthState>(state => state.general);

    return (
        <div className="flex space-x-2 mb-10">
            <div className="flex text-sm flex-col">
                <p className="font-bold text-neutral-950 dark:text-neutral-200">{userData?.FirstName} {userData?.LastName}</p>
                <p className="font-light text-neutral-800 dark:text-neutral-300">{userData?.Role}</p>
            </div>
        </div>
    );
};

const SidebarFooter = () => {

    const router = useRouter();

    const dispatch = useDispatch<AppDispatch>();

    async function HandleLogout() {
        if (dispatch) {
            dispatch(logout())
            dispatch(logoutGeneral())
            storageService.removeData('token')
            storageService.removeData('userData')
            router.push('/')
        }
    }

    return (
        <div className="flex space-x-2 mb-10">
            <div className="flex text-sm flex-col">
                <Button
                    className="bg-neutral-100"
                    onClick={HandleLogout}
                >Logout</Button>
            </div>
        </div>
    );
};
