import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "../sidebar/app-sidebar"
import Navbar from "@/app/landing/components/Navbar"
import ChatTextarea from "@/app/landing/components/ChatTextarea"

const CasesLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="relative min-h-screen flex flex-col">
                {/* Top Navbar (Sticky) */}
                <div className="sticky top-1 z-10 border-b bg-white">
                    <Navbar showLinks={false} />
                </div>

                {/* Main scrollable content area */}
                <div className="flex-1 overflow-auto h-full my-auto">
                    <p className="flex items-center justify-center h-full text-6xl line-clamp-2 font-semibold">How are you feeling today?</p>
                </div>

                {/* Bottom Chat Box (Sticky to bottom) */}
                <div className="sticky bottom-52 z-10 bg-white">
                    <ChatTextarea />
                    <p className="text-xs text-muted-foreground text-center mt-1">Write a detailed query for better results. This will create a new case.</p>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default CasesLayout
