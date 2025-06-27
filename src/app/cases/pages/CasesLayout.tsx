import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "../sidebar/app-sidebar"
import Navbar from "@/app/landing/components/Navbar"
import CreateCase from "./CreateCase"

const CasesLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="relative min-h-screen flex flex-col">
                {/* Top Navbar (Sticky) */}
                <div className="sticky top-1 z-10 border-b bg-white">
                    <Navbar showLinks={false} />
                </div>

                <CreateCase />

            </SidebarInset>
        </SidebarProvider>
    )
}

export default CasesLayout
