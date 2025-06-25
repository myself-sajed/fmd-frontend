import Logo from '@/app/landing/components/Logo'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const SuspenseLoading = ({ label, fullPage = true }: { label?: string, fullPage?: boolean }) => {
    return (
        <div className={cn("flex items-center gap-5 flex-col justify-center", fullPage && "h-screen")}>
            <div className={cn('flex items-start gap-3 m-5', fullPage && "h-1/2")}>
                <div className="flex aspect-square size-9 items-center justify-center rounded-lg text-sidebar-primary">
                    <Logo />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <div className='flex items-center gap-2 text-primary'>
                        <Loader2 className="size-4 animate-spin" strokeWidth={3} />
                        <p className="truncate font-bold">Find My Doctor</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{label || "Fetching page data..."}</p>
                </div>
            </div>
        </div>

    )
}

export default SuspenseLoading
