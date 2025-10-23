import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full bg-white rounded-lg p-6">
        <SignUp 
          forceRedirectUrl="/dashboard"
          fallbackRedirectUrl="/dashboard"
          signInFallbackRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
