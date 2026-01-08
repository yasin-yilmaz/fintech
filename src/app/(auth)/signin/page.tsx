import AuthHeader from "@/components/auth/AuthHeader";
import SignInForm from "@/components/auth/SignInForm";

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
