import {
    ArrowUpRight,
    Copy,
    MoreHorizontal,
    Trash2,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { CircleAlertIcon } from 'lucide-react'

import type { ICase } from '../types/case-types'
import { Link, useNavigate, useParams } from "react-router-dom"
import { cn } from "@/lib/utils"
import siteLinks from "@/lib/sitelinks"
import { toast } from "sonner"
import { useState } from "react"
import useCreateCaseHandler from "../hooks/useCreateCaseHandler"

const ShowCaseList = ({ cases }: { cases: ICase[] }) => {

    const { isMobile } = useSidebar()
    const { caseId } = useParams()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const handleCopy = (item: ICase) => {
        navigator.clipboard.writeText(siteLinks.caseDetails(item._id).link)
        toast.success("Link copied to clipboard")
    }

    const onSuccessfulDeletion = () => {
        setOpen(false)
        setDeleteItem(null)

        if (caseId) {
            navigate(siteLinks.cases.link)
        }
    }

    const { deleteCaseMutate, isDeleting } = useCreateCaseHandler({ onSuccess: onSuccessfulDeletion })

    const [deleteItem, setDeleteItem] = useState<ICase | null>(null)

    const handleOpenInNewTab = (item: ICase) => {
        window.open(siteLinks.caseDetails(item._id).link, "_blank")
    }

    const handleRemoveCase = (caseToDelete: ICase) => {
        setDeleteItem(caseToDelete)
        setOpen(true)
    }

    const handleDeleteCase = () => {
        deleteCaseMutate(deleteItem?._id as string)
    }

    return (
        <div>
            {cases.map((item) => (
                <SidebarMenuItem className={cn(caseId === item._id && "bg-muted font-medium rounded-md")} key={item._id}>
                    <SidebarMenuButton asChild>
                        <Link to={siteLinks.caseDetails(item?._id).link}>
                            <span>{item.ai_case_name}</span>
                        </Link>
                    </SidebarMenuButton>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuAction showOnHover>
                                <MoreHorizontal />
                                <span className="sr-only">More</span>
                            </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-56 rounded-lg"
                            side={isMobile ? "bottom" : "right"}
                            align={isMobile ? "end" : "start"}
                        >
                            <DropdownMenuItem onClick={() => { handleCopy(item) }}>
                                <Copy className="text-muted-foreground" />
                                <span>Copy Link</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { handleOpenInNewTab(item) }}>
                                <ArrowUpRight className="text-muted-foreground" />
                                <span>Open in New Tab</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem disabled={isDeleting} onClick={() => { handleRemoveCase(item) }}>
                                <Trash2 className="text-muted-foreground" />
                                <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            ))}

            <div>
                <AlertDialog open={open}
                    onOpenChange={(isOpen) => {
                        if (isOpen) {
                            setOpen(isOpen)
                        }
                    }}>
                    <AlertDialogContent>
                        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                            <div
                                className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                                aria-hidden="true"
                            >
                                <CircleAlertIcon className="opacity-80" size={16} />
                            </div>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will delete { }This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={onSuccessfulDeletion} className="ring-0 focus-visible:ring-0">Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive hover:bg-destructive/90" disabled={isDeleting} onClick={handleDeleteCase}>
                                <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}

export default ShowCaseList
