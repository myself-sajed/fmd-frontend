import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { IUserInfo } from '../types/user-types'

const LoggedInUserInfo = ({ user }: { user: IUserInfo }) => {

    return (
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback className="rounded-lg border">
                    {user?.name
                        ?.split(" ")
                        .map((part: string) => part[0]?.toUpperCase())
                        .join("") || "?"}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
            </div>
        </div>
    )
}

export default LoggedInUserInfo
