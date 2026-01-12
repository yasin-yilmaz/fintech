import { pageMetadata } from "@/lib/metadata";

import AuthHeader from "@/components/auth/AuthHeader";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata = pageMetadata({
  title: "Create new account",
  description: "Create your Fintech account to start managing your finances.",
  canonical: "/signup",
});

export default function SignUpPage() {
  return (
    <>
      <AuthHeader
        title="Create new account"
        subtitle="Welcome back! Please enter your details"
      />
      <div className="mt-8">
        <SignUpForm />
      </div>
    </>
  );
}
