import { pageMetadata } from "@/lib/metadata";

import AuthHeader from "@/components/auth/AuthHeader";
import SignInForm from "@/components/auth/SignInForm";

export const metadata = pageMetadata({
  title: "Sign in",
  description: "Sign in to Fintech and continue to your dashboard.",
  canonical: "/signin",
});

export default function SignInPage() {
  return (
    <>
      <AuthHeader
        title="Sign In"
        subtitle="Welcome back! Please enter your details"
      />

      <div className="mt-8">
        <SignInForm />
      </div>
    </>
  );
}
