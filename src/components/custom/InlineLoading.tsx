import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const InlineLoading = ({ title, className, showSpinner = true }: { title?: string, className?: string, showSpinner?: boolean }) => {
    return (
        <div className={cn(className, "h-full w-full flex items-center justify-center")}>
            <div className="flex items-center gap-3 text-center text-muted-foreground">
                {showSpinner && <Loader2 size={18} className="animate-spin text-center" />}
                {title && <div>
                    <p className="text-xs font-semibold">{title}, please wait...</p>
                </div>}
            </div>
        </div>
    )
}

export default InlineLoading
