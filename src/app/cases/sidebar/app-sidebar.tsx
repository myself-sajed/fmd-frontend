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
  cases: [
    // {
    //   name: "Project Management & Task Tracking",
    //   url: "#",
    //   emoji: "📊",
    // },
    // {
    //   name: "Family Recipe Collection & Meal Planning",
    //   url: "#",
    //   emoji: "🍳",
    // },
    // {
    //   name: "Fitness Tracker & Workout Routines",
    //   url: "#",
    //   emoji: "💪",
    // },
    // {
    //   name: "Book Notes & Reading List",
    //   url: "#",
    //   emoji: "📚",
    // },
    // {
    //   name: "Sustainable Gardening Tips & Plant Care",
    //   url: "#",
    //   emoji: "🌱",
    // },
    // {
    //   name: "Language Learning Progress & Resources",
    //   url: "#",
    //   emoji: "🗣️",
    // },
    // {
    //   name: "Home Renovation Ideas & Budget Tracker",
    //   url: "#",
    //   emoji: "🏠",
    // },
    // {
    //   name: "Personal Finance & Investment Portfolio",
    //   url: "#",
    //   emoji: "💰",
    // },
    // {
    //   name: "Movie & TV Show Watchlist with Reviews",
    //   url: "#",
    //   emoji: "🎬",
    // },
    // {
    //   name: "Daily Habit Tracker & Goal Setting",
    //   url: "#",
    //   emoji: "✅",
    // },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavCases cases={data.cases} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
