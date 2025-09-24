export default function Footer() {
  return (
    <footer className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-bold text-[#0C4A6E] mb-4">Dev Pocket</h3>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
            Empowering your career with AI-driven insights and personalized roadmaps.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold text-[#0C4A6E] mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-[#0C4A6E] transition-colors duration-200 ease-in-out"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-[#0C4A6E] transition-colors duration-200 ease-in-out"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-[#0C4A6E] transition-colors duration-200 ease-in-out"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Social & Newsletter Section */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold text-[#0C4A6E] mb-4">Stay Connected</h4>
          <p className="text-sm text-gray-500 mb-4">
            Join our vibrant community and skyrocket your career journey!
          </p>
          <div className="flex space-x-4 mb-4">
            <a
              href="#"
              className="p-2 bg-gray-100 rounded-full hover:bg-[#0C4A6E] hover:text-white transition-colors duration-200"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              className="p-2 bg-gray-100 rounded-full hover:bg-[#0C4A6E] hover:text-white transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.024-3.037-1.85-3.037-1.852 0-2.136 1.445-2.136 2.939v5.667H9.352V9h3.414v1.561h.048c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h-.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Dev Pocket. All rights reserved.
        </p>
      </div>
    </footer>
  );
}