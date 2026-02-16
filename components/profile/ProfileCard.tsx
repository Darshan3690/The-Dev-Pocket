"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { MapPin, Briefcase, Link as LinkIcon } from "lucide-react"
import { SocialLinks } from "@/lib/types/profile"

interface ProfileCardProps {
  username: string
  name?: string
  bio?: string
  avatar?: string
  skills?: string[]
  socialLinks?: SocialLinks
  location?: string
  title?: string
  showEditButton?: boolean
  onEdit?: () => void
}

export default function ProfileCard({
  username,
  name,
  bio,
  avatar,
  skills,
  socialLinks,
  location,
  title,
  showEditButton = false,
  onEdit,
}: ProfileCardProps) {
  const displayName = name || username

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Cover/Header Area */}
      <div className="h-32 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600" />

      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-16 mb-4">
          <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-700 shadow-lg">
            {avatar ? (
              <Image
                src={avatar}
                alt={displayName}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900 dark:to-purple-900">
                <span className="text-4xl">👤</span>
              </div>
            )}
          </div>
        </div>

        {/* Name & Title */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {displayName}
          </h1>
          {title && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm">{title}</span>
            </div>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            @{username}
          </p>
        </div>

        {/* Bio */}
        {bio && (
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            {bio}
          </p>
        )}

        {/* Location */}
        {location && (
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Social Links */}
        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg text-sm text-sky-700 dark:text-sky-300 hover:bg-sky-200 dark:hover:bg-sky-900/50 transition"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter
                </a>
              )}
              {socialLinks.website && (
                <a
                  href={socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-sm text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 transition"
                >
                  <LinkIcon className="w-4 h-4" />
                  Website
                </a>
              )}
            </div>
          </div>
        )}

        {/* Edit Button */}
        {showEditButton && onEdit && (
          <button
            onClick={onEdit}
            className="w-full mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </motion.div>
  )
}
