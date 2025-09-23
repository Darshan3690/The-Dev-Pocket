export default function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500 border-t">
      <p className="mb-2">&copy; {new Date().getFullYear()} Dev Pocket. All rights reserved.</p>
      <div className="flex justify-center space-x-4">
        <a href="#" className="hover:text-sky-600 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-sky-600 transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-sky-600 transition-colors">Contact</a>
      </div>
    </footer>
  );
}
