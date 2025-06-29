import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "../sidebar/app-sidebar"
import Navbar from "@/app/landing/components/Navbar"
import CreateCase from "./CreateCase"
import { useParams } from "react-router-dom"
import CaseDetails from "./CaseDetails"

const CasesLayout = () => {

    const { caseId } = useParams()

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="relative min-h-screen flex flex-col">
                <div className="sticky top-1 z-10 border-b bg-white">
                    <Navbar showLinks={false} />
                </div>

                <div>
                    {
                        caseId
                            ? <CaseDetails />
                            : <CreateCase />
                    }
                </div>

            </SidebarInset>
        </SidebarProvider>
    )
}

export default CasesLayout
