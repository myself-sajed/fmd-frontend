import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type PropType = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
    title?: string
    desc?: string
    className?: string
    childClassName?: string
    closeOnOutsideClick?: boolean // <-- new prop
}

const ShowDialog = ({
    open,
    setOpen,
    children,
    title,
    desc,
    className = "",
    childClassName = "",
    closeOnOutsideClick = true,
}: PropType) => {
    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (closeOnOutsideClick || isOpen) {
                    setOpen(isOpen)
                }
            }}
        >
            <DialogContent className={cn(className)}>
                <DialogHeader className="-space-y-2">
                    {title && <DialogTitle className="text-left text-base sm:text-lg">{title}</DialogTitle>}
                    {desc && <DialogDescription className="text-left text-xs">{desc}</DialogDescription>}
                </DialogHeader>
                <div className={cn(childClassName)}>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ShowDialog
