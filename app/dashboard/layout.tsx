"use client"

import { ReactNode, useState } from "react"
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
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Plus,
  UserPlus,
  Zap,
  MapPin,
  ArrowRight
} from "lucide-react"

import { UserButton } from "@clerk/nextjs";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, tooltip: "Overview" },
  { name: "AI Project Recommender", href: "/dashboard/projects", icon: Bot, tooltip: "Get AI project suggestions" },
  { name: "Quiz Center", href: "/dashboard/quiz", icon: Brain, tooltip: "Test your knowledge" },
  { name: "Resume Builder", href: "/dashboard/resume", icon: FileText, tooltip: "Build your resume" },
  { name: "Community Forum", href: "/dashboard/forum", icon: Users, tooltip: "Connect with others" },
  { name: "Notes / To-Do", href: "/dashboard/notes", icon: StickyNote, tooltip: "Manage your tasks" },
  { name: "Calendar", href: "/dashboard/calendar", icon: Calendar, tooltip: "Schedule events" }
]

// Enhanced Quick Actions data with better organization make it more interactive and visually appealing
const quickActions = [
  {
    id: "create-roadmap",
    title: "Create Roadmap",
    subtitle: "Plan your learning journey",
    icon: MapPin,
    href: "/create-roadmap", // it already exists
    gradient: "from-blue-500 via-blue-600 to-indigo-600",
    hoverGradient: "from-blue-600 via-blue-700 to-indigo-700",
    category: "Planning"
  },
  {
    id: "study-buddy",
    title: "Study Buddy",
    subtitle: "Find learning partners",
    icon: UserPlus,
    href: "/dashboard/study-buddy", // add the study buddy link here
    gradient: "from-purple-500 via-purple-600 to-pink-600",
    hoverGradient: "from-purple-600 via-purple-700 to-pink-700",
    category: "Social"
  },
  {
    id: "ai-recommender",
    title: "AI Project Recommender",
    subtitle: "Get personalized suggestions",
    icon: Bot,
    href: "/dashboard/projects", // add the AI recommender link here
    gradient: "from-emerald-500 via-teal-600 to-cyan-600",
    hoverGradient: "from-emerald-600 via-teal-700 to-cyan-700",
    category: "AI Tools"
  },
  {
    id: "resume-builder",
    title: "Resume Builder",
    subtitle: "Create stunning resumes",
    icon: FileText,
    href: "/dashboard/resume", // add the resume link here
    gradient: "from-orange-500 via-red-500 to-pink-500",
    hoverGradient: "from-orange-600 via-red-600 to-pink-600",
    category: "Career"
  },
  {
    id: "quiz-center",
    title: "Quiz Center",
    subtitle: "Test your knowledge",
    icon: Brain,
    href: "/dashboard/quiz", // add the quiz link here
    gradient: "from-violet-500 via-purple-500 to-indigo-500",
    hoverGradient: "from-violet-600 via-purple-600 to-indigo-600",
    category: "Learning"
  },
  {
    id: "notes-todo",
    title: "Notes / To-Do",
    subtitle: "Organize your tasks",
    icon: StickyNote,
    href: "/dashboard/notes", //add the notes link here
    gradient: "from-amber-500 via-orange-500 to-red-500",
    hoverGradient: "from-amber-600 via-orange-600 to-red-600",
    category: "Productivity"
  },
  {
    id: "calendar",
    title: "Calendar",
    subtitle: "Schedule and manage events",
    icon: Calendar,
    href: "/dashboard/calendar", // add the calendar link here
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    hoverGradient: "from-green-600 via-emerald-600 to-teal-600",
    category: "Planning"
  },
  {
    id: "quick-start",
    title: "Quick Start",
    subtitle: "Jump into any topic",
    icon: Zap,
    href: "/dashboard/quick-start",
    gradient: "from-pink-500 via-rose-500 to-red-500",
    hoverGradient: "from-pink-600 via-rose-600 to-red-600",
    category: "Getting Started"
  }
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  // Quick Actions Component for better organization and readability
  const QuickActionsSection = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Quick Actions
          </h2>
          <p className="text-slate-600 mt-1">Jump into any feature instantly</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.id}
              href={action.href}
              className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200/60 hover:border-slate-300/60 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative p-6">
                {/* Icon with gradient background */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Category Badge */}
                <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 mb-3 group-hover:bg-slate-200 transition-colors duration-200">
                  {action.category}
                </div>

                {/* Title and Subtitle */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900 group-hover:text-slate-800 transition-colors duration-200">
                    {action.title}
                  </h3>
                  <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors duration-200">
                    {action.subtitle}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                </div>

                {/* Hover Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>

              {/* Bottom Border Accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${action.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
            </Link>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* here we define the Sidebar */}
      <aside className={`
        ${sidebarCollapsed ? 'w-16' : 'w-64'} 
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:static inset-y-0 left-0 z-50
        bg-white/90 backdrop-blur-xl border-r border-slate-200/60 
        flex flex-col transition-all duration-300 ease-in-out
        shadow-xl lg:shadow-none
      `}>
        {/* here we define the Logo/Brand */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200/60">
          {!sidebarCollapsed && (
            <div className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              The Dev Pocket
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* here we define the Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            return (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`
                    flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25" 
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }
                    ${sidebarCollapsed ? 'justify-center' : ''}
                  `}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className={`${sidebarCollapsed ? 'w-5 h-5' : 'w-4 h-4'} flex-shrink-0`} />
                  {!sidebarCollapsed && <span className="truncate">{link.name}</span>}
                  {isActive && !sidebarCollapsed && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                  )}
                </Link>
                
                {/* Tooltip for collapsed sidebar */}
                {sidebarCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                    {link.name}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-4 border-transparent border-r-slate-900" />
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-3 border-t border-slate-200/60">
          <button className={`
            flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-all duration-200 w-full
            ${sidebarCollapsed ? 'justify-center' : ''}
          `}>
            <Settings className={`${sidebarCollapsed ? 'w-5 h-5' : 'w-4 h-4'} flex-shrink-0`} />
            {!sidebarCollapsed && <span>Settings</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="pl-10 pr-4 py-2 w-64 bg-slate-100/70 border-0 rounded-xl text-sm placeholder:text-slate-500 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
              />
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2">
              <UserButton 
                afterSignOutUrl="/" 
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 rounded-xl"
                  }
                }}
              />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-slate-50/50 to-white/50">
          {/* Render Quick Actions if on dashboard page, otherwise render children */}
          {pathname === '/dashboard' ? (
            <div>
              <QuickActionsSection />
              {children}
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  )
}