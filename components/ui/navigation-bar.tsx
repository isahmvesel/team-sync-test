"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react"; 

const NavBar = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const theme = localStorage.getItem("theme");
        return theme === "dark";
    });

    useEffect(() => {
        setIsDarkMode(localStorage.getItem("theme") === "dark");
    }, []);

    return (
        <div className={`navbar fixed bottom-0 left-0 w-full items-center shadow-md flex justify-around h-[10vh] border-t z-10 p-0`}>
            <NavBarItem href="/calendar" icon="/nav_bar_icons/Search.png" active={false} />
            <NavBarItem href="/calendar" icon="/nav_bar_icons/Groups.png" active={false} />
            <NavBarItem href="/calendar" icon="/nav_bar_icons/Calendar.png" active={false} />
            <NavBarItem href="/settings" icon="/nav_bar_icons/Settings.png" active={false} />
            <NavBarItem href="/profile" icon="/nav_bar_icons/Profile.png" active={false} />
        </div>
    );
};

const NavBarItem = ({ href, icon, active }: { href: string; icon: string; active: boolean }) => {
    const isDarkMode = localStorage.getItem("theme") === "dark";

    // Dynamically change the icon based on the theme
    const iconSrc = isDarkMode ? icon.replace(".png", "-White.png") : icon;

    return (
        <Link href={href}>
            <Button variant={active ? "default" : "ghost"} className="justify-center flex flex-col items-center w-[4vw] h-[4vw] relative">
                {/* Use iconSrc */}
                <Image src={iconSrc} alt="Icon" fill className="object-contain" />
            </Button>
        </Link>
    );
};

export default NavBar;