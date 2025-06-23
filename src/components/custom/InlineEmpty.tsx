import { cn } from "@/lib/utils"
import { Inbox } from "lucide-react"
import React from "react"

const InlineEmpty = ({ title, className, showBox = true, children }: { title?: string, className?: string, showBox?: boolean, children?: React.ReactNode }) => {
    return (
        <div className={cn(className, "h-full w-full flex items-center justify-center")}>
            <div className="flex items-center gap-3 text-center text-muted-foreground">
                {showBox && <Inbox size={18} className="text-center" />}
                {<div>
                    {title && <p className="text-xs font-semibold">{title}</p>}
                    {children && children}
                </div>}
            </div>
        </div>
    )
}

export default InlineEmpty
