"use client";

import { useState, useEffect } from "react";
import { UserProfile } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { BookOpen, UserCircle, Loader2 } from "lucide-react";
import { showSuccess, showError } from "@/lib/toast";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileForm from "@/components/profile/ProfileForm";
import { ProfileFormData } from "@/lib/types/profile";

const SettingsPage = () => {
  const { isLoaded, user } = useUser();
  const [profile, setProfile] = useState<ProfileFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      fetchProfile();
    }
  }, [isLoaded, user]);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile");
      const data = await response.json();
      if (data.profile) {
        setProfile({
          username: data.profile.username || "",
          bio: data.profile.bio || "",
          avatar: data.profile.avatar || "",
          skills: data.profile.skills || [],
          socialLinks: data.profile.socialLinks || {},
          isPublic: data.profile.isPublic ?? true,
          location: data.profile.location || "",
          title: data.profile.title || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (formData: ProfileFormData) => {
    setSaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save profile");
      }

      const data = await response.json();
      setProfile(formData);
      setEditing(false);
      showSuccess("Profile saved successfully!");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Failed to save profile");
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const handleRestartTutorial = () => {
    localStorage.removeItem("onboarding-completed");
    window.dispatchEvent(new Event("restart-onboarding"));
    showSuccess("Tutorial restarted! The onboarding tour will begin shortly.");
  };

  if (!isLoaded || loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Custom Settings Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          App Settings
        </h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Onboarding Tutorial
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Need a refresher? Restart the interactive onboarding tour to learn about all features.
                </p>
              </div>
            </div>
            <button
              onClick={handleRestartTutorial}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              Restart Tour
            </button>
          </div>
        </div>
      </div>

      {/* Public Profile Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Public Profile
        </h2>
        
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Profile Preview/Edit */}
          <div>
            {editing ? (
              <ProfileForm
                initialData={profile || undefined}
                onSave={handleSaveProfile}
                onCancel={() => setEditing(false)}
              />
            ) : (
              <ProfileCard
                username={profile?.username || user?.username || "username"}
                name={user?.fullName || undefined}
                bio={profile?.bio}
                avatar={profile?.avatar}
                skills={profile?.skills}
                socialLinks={profile?.socialLinks}
                location={profile?.location}
                title={profile?.title}
                showEditButton={true}
                onEdit={() => setEditing(true)}
              />
            )}
          </div>

          {/* Profile Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg">
                <UserCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Your Public Profile
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showcase your skills, achievements, and learning progress to the community.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">Profile URL</span>
                <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                  devpocket.com/profile/{profile?.username || "username"}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">Visibility</span>
                <span className={`text-sm font-medium ${profile?.isPublic ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}`}>
                  {profile?.isPublic ? "Public" : "Private"}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">Skills Listed</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {profile?.skills?.length || 0}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">Social Links</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {Object.values(profile?.socialLinks || {}).filter(Boolean).length}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
              <p className="text-sm text-violet-700 dark:text-violet-300">
                <strong>Tip:</strong> A complete profile helps you connect with other developers and showcases your learning journey to potential employers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clerk User Profile */}
      <div className="flex items-center justify-center w-full">
        <UserProfile path="/settings" routing="path" />
      </div>
    </div>
  );
};

export default SettingsPage;
