"use client"

import { ReactNode, useState, Suspense } from "react"
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
  Settings,
  Menu,
  X,
  UserPlus,
  Zap,
  MapPin,
  ArrowRight,
  Bookmark
} from "lucide-react"

import { UserButton } from "@clerk/nextjs";
import { InlineLoader } from "../components/ui/Spinner";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, tooltip: "Overview" },
  { name: "AI Project Recommender", href: "/dashboard/projects", icon: Bot, tooltip: "Get AI project suggestions" },
  { name: "Quiz Center", href: "/dashboard/quiz", icon: Brain, tooltip: "Test your knowledge" },
  { name: "Resume Builder", href: "/dashboard/resume", icon: FileText, tooltip: "Build your resume" },
  { name: "My Bookmarks", href: "/dashboard/bookmarks", icon: Bookmark, tooltip: "Saved resources" },
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
      <aside
        id="dashboard-sidebar"
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          ${sidebarCollapsed ? 'w-16' : 'w-64'} 
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-white/95 backdrop-blur-xl border-r border-slate-200/60 
          flex flex-col transition-all duration-300 ease-in-out
          shadow-2xl lg:shadow-none
        `}
        role="navigation"
        aria-label="Dashboard sidebar navigation"
        aria-hidden={!mobileMenuOpen}
      >
        {/* here we define the Logo/Brand */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-slate-200/60">
          {!sidebarCollapsed && (
            <div
              className="font-extrabold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm"
              role="heading"
              aria-level={1}
            >
              The Dev Pocket
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex p-2 rounded-lg hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-200"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!sidebarCollapsed}
            type="button"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" aria-hidden="true" /> : <ChevronLeft className="w-4 h-4" aria-hidden="true" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-200"
            aria-label="Close sidebar menu"
            type="button"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* here we define the Navigation */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto" aria-label="Dashboard navigation">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            return (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`
                    flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-bold transition-all duration-300
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                    ${isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl shadow-blue-500/40 scale-105"
                      : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 hover:scale-105 hover:shadow-md"
                    }
                    ${sidebarCollapsed ? 'justify-center' : ''}
                  `}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={sidebarCollapsed ? link.name : undefined}
                  title={sidebarCollapsed ? link.tooltip : undefined}
                >
                  <Icon className={`${sidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0`} aria-hidden="true" />
                  {!sidebarCollapsed && <span className="truncate">{link.name}</span>}
                  {isActive && !sidebarCollapsed && (
                    <div className="ml-auto w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-lg" aria-hidden="true" />
                  )}
                </Link>

                {/* Tooltip for collapsed sidebar */}
                {sidebarCollapsed && (
                  <div
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-4 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 pointer-events-none shadow-xl"
                    role="tooltip"
                    aria-hidden="true"
                  >
                    {link.name}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-[6px] border-transparent border-r-slate-900" />
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-3 border-t border-slate-200/60">
          <Link href={"/settings"}>
            <button
              className={`
              flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-bold text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 hover:scale-105 hover:shadow-md transition-all duration-300 w-full
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
              ${sidebarCollapsed ? 'justify-center' : ''}
              `}
              aria-label={sidebarCollapsed ? "Settings" : undefined}
              title={sidebarCollapsed ? "Settings" : undefined}
              type="button"
            >
              <Settings className={`${sidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0`} aria-hidden="true" />
              {!sidebarCollapsed && <span>Settings</span>}
            </button>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header
          className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-8 sticky top-0 z-30 shadow-lg"
          role="banner"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-3 rounded-2xl hover:bg-slate-100/80 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-300 hover:scale-105"
              aria-label="Open sidebar menu"
              aria-controls="dashboard-sidebar"
              type="button"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent drop-shadow-sm">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" aria-hidden="true" />
              <label htmlFor="dashboard-search" className="sr-only">Search dashboard</label>
              <input
                id="dashboard-search"
                type="search"
                placeholder="Search anything..."
                className="pl-12 pr-5 py-3 w-72 bg-slate-100/70 backdrop-blur-sm border-0 rounded-2xl text-base font-medium placeholder:text-slate-500 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:shadow-lg focus:outline-none transition-all duration-300"
                aria-label="Search dashboard content"
              />
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2" role="complementary" aria-label="User menu">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-11 h-11 rounded-2xl transition-all duration-300 hover:scale-110 shadow-md"
                  }
                }}
              />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-slate-50/50 to-white/50" role="main">
          {/* Render Quick Actions if on dashboard page, otherwise render children */}
          {pathname === '/dashboard' ? (
            <div>
              <QuickActionsSection />
              <Suspense fallback={<InlineLoader text="Loading dashboard content..." />}>
                {children}
              </Suspense>
            </div>
          ) : (
            <Suspense fallback={<InlineLoader text="Loading..." />}>
              {children}
            </Suspense>
          )}
        </main>
      </div>
    </div>
  )
}