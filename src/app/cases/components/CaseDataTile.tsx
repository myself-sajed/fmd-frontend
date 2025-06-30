import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

type Props = {
    Icon: LucideIcon,
    value?: string | number | undefined;
    iconClassName?: string;
    valueClassName?: string;
    className?: string;
    children?: React.ReactNode;
}

const CaseDataTile = ({ Icon, value, iconClassName, valueClassName, className, children }: Props) => {
    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <Icon className={cn("h-4 w-4 text-gray-500", iconClassName)} />
            {children || <span className={cn("text-sm", valueClassName)}>
                {value || "N/A"}
            </span>}
        </div>
    )
}

export default CaseDataTile
