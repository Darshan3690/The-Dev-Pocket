import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 pt-20 sm:pt-24">
      <div className="w-full max-w-[min(400px,90vw)] mx-auto">
        <SignUp
          forceRedirectUrl="/dashboard"
          fallbackRedirectUrl="/dashboard"
          signInFallbackRedirectUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "w-full shadow-xl",
              formButtonPrimary: "bg-sky-600 hover:bg-sky-700",
              formFieldInput: "rounded-lg",
              footerAction: "hidden",
            },
            layout: {
              socialButtonsPlacement: "top",
              socialButtonsVariant: "iconButton",
            },
          }}
        />
      </div>
    </div>
  );
}