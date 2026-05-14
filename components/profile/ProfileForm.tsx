"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Briefcase, MapPin, Link as LinkIcon, Github, Linkedin, Twitter, Globe, Eye, EyeOff, Check, X, Plus, Trash2 } from "lucide-react"
import { ProfileFormData, SocialLinks } from "@/lib/types/profile"
import { showSuccess, showError } from "@/lib/toast"

interface ProfileFormProps {
  initialData?: Partial<ProfileFormData>
  onSave: (data: ProfileFormData) => Promise<void>
  onCancel?: () => void
}

export default function ProfileForm({ initialData, onSave, onCancel }: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    username: "",
    bio: "",
    avatar: "",
    skills: [],
    socialLinks: {},
    isPublic: true,
    location: "",
    title: "",
    ...initialData,
  })

  const [newSkill, setNewSkill] = useState("")
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const [checkingUsername, setCheckingUsername] = useState(false)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Debounced username check
  useEffect(() => {
    if (formData.username.length < 3) {
      setUsernameAvailable(null)
      return
    }

    const timer = setTimeout(() => {
      checkUsername(formData.username)
    }, 500)

    return () => clearTimeout(timer)
  }, [formData.username])

  const checkUsername = async (username: string) => {
    if (username.length < 3) return

    setCheckingUsername(true)
    try {
      const response = await fetch(`/api/profile/check-username?username=${encodeURIComponent(username)}`)
      const data = await response.json()
      setUsernameAvailable(data.available)
    } catch (error) {
      console.error("Error checking username:", error)
    } finally {
      setCheckingUsername(false)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.username || formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }

    const usernameRegex = /^[a-zA-Z0-9_-]+$/
    if (formData.username && !usernameRegex.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, underscores, and hyphens"
    }

    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = "Bio must be less than 500 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      showError("Please fix the errors in the form")
      return
    }

    if (usernameAvailable === false) {
      showError("Username is already taken")
      return
    }

    setSaving(true)
    try {
      await onSave(formData)
      showSuccess("Profile saved successfully!")
    } catch (error) {
      showError("Failed to save profile")
      console.error("Error saving profile:", error)
    } finally {
      setSaving(false)
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills?.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills?.filter((skill) => skill !== skillToRemove) || [],
    }))
  }

  const updateSocialLink = (platform: keyof SocialLinks, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }))
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Edit Public Profile
        </h2>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            aria-label="Cancel editing"
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}

      </div>

      {/* Username */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Username *
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value.toLowerCase() }))}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="your-username"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {checkingUsername ? (
              <div className="w-5 h-5 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
            ) : usernameAvailable === true ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : usernameAvailable === false ? (
              <X className="w-5 h-5 text-red-500" />
            ) : null}
          </div>
        </div>
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          This will be your public profile URL: devpocket.com/profile/{formData.username || "username"}
        </p>
      </div>

      {/* Avatar URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Avatar URL
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="url"
            value={formData.avatar}
            onChange={(e) => setFormData((prev) => ({ ...prev, avatar: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>
      </div>

      {/* Job Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Job Title
        </label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="Full Stack Developer"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="San Francisco, CA"
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bio
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
          rows={4}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
            errors.bio ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Tell us about yourself..."
        />
        {errors.bio && <p className="mt-1 text-sm text-red-500">{errors.bio}</p>}
        <p className="mt-1 text-xs text-gray-500">{formData.bio?.length || 0}/500</p>
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Skills
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="Add a skill (e.g., React, TypeScript)"
          />
          <button
            type="button"
            onClick={addSkill}
            aria-label="Add skill"
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
          >
            <Plus className="w-5 h-5" />
          </button>

        </div>
        <div className="flex flex-wrap gap-2">
          {formData.skills?.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                aria-label={`Remove skill ${skill}`}
                className="hover:text-violet-900 dark:hover:text-violet-100"
              >
                <Trash2 className="w-3 h-3" />
              </button>

            </span>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Social Links
        </label>
        <div className="space-y-3">
          <div className="relative">
            <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={formData.socialLinks?.github || ""}
              onChange={(e) => updateSocialLink("github", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              placeholder="https://github.com/username"
            />
          </div>
          <div className="relative">
            <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={formData.socialLinks?.linkedin || ""}
              onChange={(e) => updateSocialLink("linkedin", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div className="relative">
            <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={formData.socialLinks?.twitter || ""}
              onChange={(e) => updateSocialLink("twitter", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              placeholder="https://twitter.com/username"
            />
          </div>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={formData.socialLinks?.website || ""}
              onChange={(e) => updateSocialLink("website", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>
      </div>

      {/* Privacy Toggle */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              formData.isPublic ? "bg-violet-600" : "bg-gray-300 dark:bg-gray-600"
            }`}
            onClick={() => setFormData((prev) => ({ ...prev, isPublic: !prev.isPublic }))}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                formData.isPublic ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {formData.isPublic ? (
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Public Profile
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <EyeOff className="w-4 h-4" />
                Private Profile
              </span>
            )}
          </span>
        </label>
        <p className="mt-1 text-xs text-gray-500 ml-14">
          {formData.isPublic
            ? "Your profile is visible to everyone"
            : "Only you can see your profile"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={saving || usernameAvailable === false}
          className="flex-1 px-4 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </span>
          ) : (
            "Save Profile"
          )}
        </button>
      </div>
    </motion.form>
  )
}
