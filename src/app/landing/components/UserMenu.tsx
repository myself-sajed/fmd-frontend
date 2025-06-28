import {
    Loader2,
    LogOutIcon,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useLogout from "@/app/authentication/hooks/use-logout"
import type { IUserInfo } from "@/app/authentication/types/user-types"

export default function UserMenu({ user }: { user: IUserInfo }) {

    const { isLoggingOut, logoutMutate } = useLogout()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" disabled={isLoggingOut} className="h-auto p-0 hover:bg-transparent">
                    {
                        isLoggingOut
                            ? <Loader2 className="animate-spin h-5 w-5" />
                            : <Avatar>
                                <AvatarImage src={user?.photoURL} alt="Profile image" />
                                <AvatarFallback>{user?.name
                                    ?.split(" ")
                                    .map((part: string) => part[0]?.toUpperCase())
                                    .join("") || "?"}
                                </AvatarFallback>
                            </Avatar>
                    }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-64" align="end">
                <DropdownMenuLabel className="flex min-w-0 flex-col">
                    <span className="text-foreground truncate text-sm font-medium">
                        {user.name}
                    </span>
                    <span className="text-muted-foreground truncate text-xs font-normal">
                        {user.email}
                    </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => logoutMutate()}>
                    <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
