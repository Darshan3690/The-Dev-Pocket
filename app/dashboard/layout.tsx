"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Brain,
  FileText,
  Users,
  Calendar,
  StickyNote,
  Bot
} from "lucide-react"

import { UserButton } from "@clerk/nextjs";




const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Project Recommender", href: "/dashboard/projects", icon: Bot },
  { name: "Quiz Center", href: "/dashboard/quiz", icon: Brain },
  { name: "Resume Builder", href: "/dashboard/resume", icon: FileText },
  { name: "Community Forum", href: "/dashboard/forum", icon: Users },
  { name: "Notes / To-Do", href: "/dashboard/notes", icon: StickyNote },
  { name: "Calendar", href: "/dashboard/calendar", icon: Calendar }
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="h-16 flex items-center justify-center font-bold text-xl border-b">
          The Dev Pocket
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition 
                ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 border rounded-lg text-sm"
            />
            {/* <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
              Profile
            </button> */}
                <UserButton afterSignOutUrl="/" />
            
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
