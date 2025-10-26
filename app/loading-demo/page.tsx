'use client';

import { useState } from 'react';
import {
  Skeleton,
  SkeletonCard,
  SkeletonListItem,
  SkeletonDashboardCard,
  SkeletonTable,
  SkeletonAvatar,
  SkeletonTextBlock,
  SkeletonImage,
} from '../components/ui/Skeleton';
import {
  Spinner,
  LoadingOverlay,
  InlineLoader,
  PageLoader,
  ButtonSpinner,
} from '../components/ui/Spinner';

export default function LoadingStatesDemo() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPageLoader, setShowPageLoader] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleButtonClick = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 2000);
  };

  const handleShowOverlay = () => {
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 3000);
  };

  const handleShowPageLoader = () => {
    setShowPageLoader(true);
    setTimeout(() => setShowPageLoader(false), 3000);
  };

  if (showPageLoader) {
    return <PageLoader title="Loading Demo..." subtitle="This will disappear in 3 seconds" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 py-12 px-4 sm:px-6 lg:px-8">
      {showOverlay && <LoadingOverlay message="Processing..." />}

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Loading States & Skeletons
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Beautiful loading states and skeleton components for enhanced user experience
          </p>
        </div>

        {/* Spinners Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Spinners</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Default Spinner */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Default Spinner</h3>
              <div className="flex flex-col items-center space-y-4">
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
                <Spinner size="xl" />
              </div>
            </div>

            {/* Gradient Spinner */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Gradient Spinner</h3>
              <div className="flex flex-col items-center space-y-4">
                <Spinner size="sm" variant="gradient" />
                <Spinner size="md" variant="gradient" />
                <Spinner size="lg" variant="gradient" />
                <Spinner size="xl" variant="gradient" />
              </div>
            </div>

            {/* Dots Spinner */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Dots Spinner</h3>
              <div className="flex flex-col items-center space-y-4">
                <Spinner size="sm" variant="dots" />
                <Spinner size="md" variant="dots" />
                <Spinner size="lg" variant="dots" />
                <Spinner size="xl" variant="dots" />
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demos */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Interactive Demos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Button with Loading */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Button Loading</h3>
              <button
                onClick={handleButtonClick}
                disabled={buttonLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-6 py-3 font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {buttonLoading ? (
                  <>
                    <ButtonSpinner />
                    <span>Loading...</span>
                  </>
                ) : (
                  <span>Click Me</span>
                )}
              </button>
            </div>

            {/* Overlay Demo */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Loading Overlay</h3>
              <button
                onClick={handleShowOverlay}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg px-6 py-3 font-medium hover:from-green-700 hover:to-emerald-700 transition-all"
              >
                Show Overlay
              </button>
            </div>

            {/* Page Loader Demo */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Page Loader</h3>
              <button
                onClick={handleShowPageLoader}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg px-6 py-3 font-medium hover:from-orange-700 hover:to-red-700 transition-all"
              >
                Show Page Loader
              </button>
            </div>
          </div>
        </section>

        {/* Inline Loader */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Inline Loaders</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-4">
            <InlineLoader text="Loading your data..." />
            <InlineLoader text="Processing request..." />
            <InlineLoader text="Uploading files..." />
          </div>
        </section>

        {/* Skeleton Components */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skeleton Loaders</h2>
          
          {/* Basic Skeletons */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Skeletons</h3>
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
            <div className="flex space-x-4 pt-4">
              <Skeleton variant="circular" width={64} height={64} />
              <Skeleton variant="rounded" width={200} height={64} />
            </div>
          </div>

          {/* Skeleton Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <SkeletonDashboardCard />
            <SkeletonDashboardCard />
            <SkeletonDashboardCard />
            <SkeletonDashboardCard />
          </div>

          {/* List Items */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
            <SkeletonListItem />
            <SkeletonListItem />
            <SkeletonListItem />
            <SkeletonListItem />
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Table Skeleton</h3>
            <SkeletonTable rows={5} columns={4} />
          </div>

          {/* Avatar & Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Avatar Skeleton</h3>
              <div className="flex space-x-4">
                <SkeletonAvatar size={48} />
                <SkeletonAvatar size={64} />
                <SkeletonAvatar size={80} />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Text Block Skeleton</h3>
              <SkeletonTextBlock lines={5} />
            </div>
          </div>

          {/* Image Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Image Skeleton</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SkeletonImage aspectRatio="16/9" />
              <SkeletonImage aspectRatio="4/3" />
              <SkeletonImage aspectRatio="1/1" />
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Usage Examples</h2>
          <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
            <pre className="text-green-400 text-sm">
              <code>{`// Import components
import { Skeleton, SkeletonCard } from '@/app/components/ui/Skeleton';
import { Spinner, InlineLoader } from '@/app/components/ui/Spinner';

// Use in your components
{loading ? (
  <SkeletonCard />
) : (
  <YourContent />
)}

// Button with loading state
<button disabled={loading}>
  {loading ? <ButtonSpinner /> : 'Submit'}
</button>

// Inline loader
{isProcessing && <InlineLoader text="Processing..." />}`}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
