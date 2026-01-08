import AuthHeader from "@/components/auth/AuthHeader";
import SignUpForm from "@/components/auth/SignUpForm";

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
