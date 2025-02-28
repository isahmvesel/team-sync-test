"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, Calendar, User } from "lucide-react"; // Import icons
import Image from "next/image";

const NavBar = () => {
    const pathname = usePathname(); // Get current route

    return (
        <div className="fixed bottom-0 left-0 w-full bg-[#cccccc] shadow-md flex justify-around p-2 border-t">
            <NavBarItem href="/Calendar" icon={"/nav_bar_icons/Search.png"} active={false} />
            <NavBarItem href="/Calendar" icon={"/nav_bar_icons/Groups.png"} active={false} />
            <NavBarItem href="/Calendar" icon={"/nav_bar_icons/Calendar.png"} active={false} />
            <NavBarItem href="/Calendar" icon={"/nav_bar_icons/Settings.png"} active={false} />
            <NavBarItem href="/profile" icon={"/nav_bar_icons/Profile.png"} active={false} />
        </div>

        /* */
    );
};

const NavBarItem = ({ href, icon, active }: { href: string; icon: React.ReactNode; active: boolean }) => (
    <Link href={href}>
        <Button variant={active ? "default" : "ghost"} className="flex flex-col items-center">
            {/*{icon}*/}
            <Image src={icon} alt="Icon" width={30} height={30} />
        </Button>
    </Link>
);

export default NavBar;