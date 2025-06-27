import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const Loading = ({ title, className, showSpinner = true }: { title?: string, className?: string, showSpinner?: boolean }) => {
    return (
        <div className={cn(className, "h-full w-full flex items-center justify-center")}>
            <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
                {showSpinner && <Loader2 className="animate-spin text-center" />}
                {title && <div>
                    <p className="text-sm font-semibold">{title}, please wait...</p>
                </div>}
            </div>
        </div>
    )
}

export default Loading
