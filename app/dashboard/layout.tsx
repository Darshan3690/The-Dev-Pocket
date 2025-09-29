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
  Bot,
  Search,
  Menu,
  X
} from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import { useState, useEffect } from "react"

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Project Recommender", href: "/dashboard/projects", icon: Bot },
  { name: "Quiz Center", href: "/dashboard/quiz", icon: Brain },
  { name: "Resume Builder", href: "/dashboard/resume", icon: FileText },
  { name: "Community Forum", href: "/dashboard/forum", icon: Users },
  { name: "Notes / To-Do", href: "/dashboard/notes", icon: StickyNote },
  { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 bg-white/95 backdrop-blur-lg shadow-xl md:shadow-lg
        transform transition-transform duration-300 ease-in-out
        flex flex-col border-r border-gray-200
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="h-20 flex items-center justify-center border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">The Dev Pocket</h1>
            <p className="text-blue-100 text-xs mt-1">Learn • Build • Grow</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  group relative overflow-hidden
                  ${isActive 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md"
                  }
                `}
              >
                {/* Animated background */}
                <div className={`
                  absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-transform duration-300
                  ${isActive ? 'scale-100' : 'scale-0 group-hover:scale-100'}
                `} />
                
                {/* Content */}
                <div className="relative z-10 flex items-center gap-3">
                  <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="font-medium">{link.name}</span>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/50">
            <div className="flex-shrink-0">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 ring-2 ring-white shadow-sm"
                  }
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Welcome back!</p>
              <p className="text-xs text-gray-500 truncate">Continue learning</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-lg border-b border-gray-200/60 flex items-center justify-between px-6 lg:px-8">
          <div className="flex-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              {sidebarLinks.find(link => link.href === pathname)?.name || "Dashboard"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {getPageDescription(pathname)}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search features, tools..."
                className="pl-10 pr-4 py-2.5 bg-gray-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all w-64 lg:w-80"
              />
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-700">Online</span>
              </div>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 ring-2 ring-blue-100 shadow-sm hover:ring-blue-200 transition-all"
                  }
                }}
              />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}

// Helper function to get page descriptions
function getPageDescription(pathname: string): string {
  const descriptions: { [key: string]: string } = {
    "/dashboard": "Overview of your learning progress and quick actions",
    "/dashboard/projects": "AI-powered project recommendations based on your skills",
    "/dashboard/quiz": "Test your knowledge with interactive quizzes",
    "/dashboard/resume": "Build and customize your professional resume",
    "/dashboard/forum": "Connect with other learners and share knowledge",
    "/dashboard/notes": "Organize your notes and to-do lists",
    "/dashboard/calendar": "Schedule and manage your learning sessions"
  }
  
  return descriptions[pathname] || "Manage your learning journey"
}