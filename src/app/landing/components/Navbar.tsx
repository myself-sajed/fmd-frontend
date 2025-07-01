import {
    HomeIcon,
    LayersIcon,
    User,
} from "lucide-react"

import { Button } from '@/components/ui/button'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import ThemeToggle from "@/components/custom/theme-toggle"
import UserMenu from "./UserMenu"
import { Link, useLocation } from "react-router-dom"
import AppLogo from "./AppLogo"
import { useAuthStore } from "@/store/auth-store"
import siteLinks from "@/lib/sitelinks"
import { SidebarTrigger } from "@/components/ui/sidebar"



type Props = {
    showLinks?: boolean;
}

export default function Navbar({ showLinks = true }: Props) {


    const { user } = useAuthStore()
    const { pathname } = useLocation()
    const isCasePage = pathname.includes("case")

    const navigationLinks = [
        { href: user ? siteLinks.cases.link : siteLinks.landing.link, label: user ? "Cases" : "Home", icon: HomeIcon },
        { href: "#", label: "Features", icon: LayersIcon },
        { href: "https://sajed-dev.vercel.app", label: "Creator", icon: User },
    ]

    return (
        <header className="px-4 md:px-6 bg-white z-50">
            <div className="flex h-16 items-center justify-between gap-4">
                {/* Left side */}
                <div className="flex items-center gap-2">
                    {/* Mobile menu trigger */}
                    <Popover>
                        {isCasePage && <SidebarTrigger />}
                        <PopoverTrigger asChild>
                            <Button
                                className="group size-8 md:hidden"
                                variant="ghost"
                                size="icon"
                            >
                                <svg
                                    className="pointer-events-none"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12L20 12"
                                        className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                                    />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-36 p-1 md:hidden">
                            <NavigationMenu className="max-w-none *:w-full">
                                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                                    {navigationLinks.map((link, index) => {
                                        const Icon = link.icon
                                        return (
                                            <NavigationMenuItem key={index} className="w-full">
                                                <NavigationMenuLink
                                                    href={link.href}
                                                    className="flex-row items-center gap-2 py-1.5"
                                                >
                                                    <Icon
                                                        size={16}
                                                        className="text-muted-foreground"
                                                        aria-hidden="true"
                                                    />
                                                    <span>{link.label}</span>
                                                </NavigationMenuLink>
                                            </NavigationMenuItem>
                                        )
                                    })}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </PopoverContent>
                    </Popover>
                    {/* Logo */}
                    <AppLogo />
                </div>
                {/* Middle section */}
                {showLinks && <div className="md:flex items-center justify-center gap-10 hidden">
                    {/* Desktop navigation */}
                    {navigationLinks.map((link) => (
                        <Link to={link.href} className="text-sm">{link.label}</Link>
                    ))}
                </div>}
                {/* Right side */}
                <div className="flex items-center gap-2">
                    {/* Theme toggle */}
                    <ThemeToggle />
                    {
                        user ?
                            <UserMenu user={user} />
                            : <Link to={siteLinks.login.link}><Button> <User className="h-3 w-3 opacity-80" /> Login</Button> </Link>
                    }

                </div>
            </div>
        </header>
    )
}
