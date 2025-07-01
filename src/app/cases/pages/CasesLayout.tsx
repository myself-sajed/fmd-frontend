import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "../sidebar/app-sidebar"
import Navbar from "@/app/landing/components/Navbar"
import { useParams } from "react-router-dom"
import CaseDetails from "./CaseDetails"
import NewCase from "./NewCase"

const CasesLayout = () => {

    const { caseId } = useParams()

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="relative min-h-screen flex flex-col">
                <div className="sticky top-0 z-10 border-b backdrop-blur-md">
                    <Navbar showLinks={false} />
                </div>

                <div className="h-full w-full">
                    {
                        caseId
                            ? <CaseDetails />
                            : <NewCase />
                    }
                </div>

            </SidebarInset>
        </SidebarProvider>
    )
}

export default CasesLayout
