import * as React from "react"
import {
  Pen,
  Search,
} from "lucide-react"

import { NavCases } from "@/app/cases/sidebar/nav-cases"
import { NavMain } from "@/app/cases/sidebar/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import siteLinks from "@/lib/sitelinks"

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
      url: siteLinks.cases.link,
      icon: Pen,
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
