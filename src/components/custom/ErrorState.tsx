import { cn } from "@/lib/utils"
import { Frown } from "lucide-react"

const ErrorState = ({ title, className, showBox = true }: { title?: string, className?: string, showBox?: boolean }) => {
    return (
        <div className={cn(className, "h-full w-full flex items-center justify-center")}>
            <div className="flex items-center gap-3 text-center text-muted-foreground">
                {showBox && <Frown size={18} className="text-center text-destructive" />}
                {title && <div>
                    <p className="text-xs font-semibold text-destructive">{title}, try again...</p>
                </div>}
            </div>
        </div>
    )
}

export default ErrorState
