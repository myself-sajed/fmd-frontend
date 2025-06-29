import {
  ArrowUpRight,
  Copy,
  MoreHorizontal,
  StarOff,
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
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import InlineEmpty from "@/components/custom/InlineEmpty"
import useCaseGetter from "../hooks/useCaseGetter"
import siteLinks from "@/lib/sitelinks"
import InlineLoading from "@/components/custom/InlineLoading"
import ErrorState from "@/components/custom/ErrorState"
import { Link } from "react-router-dom"

export function NavCases() {
  const { isMobile } = useSidebar()
  const { cases, isError, isLoading } = useCaseGetter()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Cases</SidebarGroupLabel>
      <SidebarMenu>
        {
          isLoading
            ? <InlineLoading className="mt-10" title="Fetching your cases" />
            : isError
              ? <ErrorState className="mt-10" title="Failed to fetch cases" />
              : cases?.length > 0
                ? cases.map((item) => (
                  <SidebarMenuItem key={item._id}>
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
                        <DropdownMenuItem>
                          <StarOff className="text-muted-foreground" />
                          <span>Remove from Favorites</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Copy className="text-muted-foreground" />
                          <span>Copy Link</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ArrowUpRight className="text-muted-foreground" />
                          <span>Open in New Tab</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Trash2 className="text-muted-foreground" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                ))
                : <div className="flex flex-col item-center gap-4">
                  <InlineEmpty title="No cases found..." className="mt-10" />
                </div>
        }
      </SidebarMenu>
    </SidebarGroup>
  )
}
