import * as React from "react"
import {
  Search,
  Sparkles,
} from "lucide-react"

import { NavCases } from "@/app/cases/sidebar/nav-cases"
import { NavMain } from "@/app/cases/sidebar/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "New Case",
      url: "#",
      icon: Sparkles,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavCases />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
