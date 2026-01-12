"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { signin } from "@/lib/api/auth/actions";

import { SubmitButton } from "@/components/ui/SubmitButton";

import {
  signinDefaultValues,
  signInSchema,
  TSignInFormValues,
} from "@/schemas/auth.schema";

import { FormField } from "../form/FormField";
import { AuthSwitchText } from "./AuthSwitchText";

const SignInForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TSignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: signinDefaultValues,
    mode: "onSubmit",
  });

  const onSubmit = async (values: TSignInFormValues) => {
    const res = await signin(values);

    if (!res.ok) {
      if (res.code === "VALIDATION_FAILED" && res.details?.length) {
        res.details.forEach((d) => {
          const field = d.field as keyof TSignInFormValues | undefined;
          const message = d.message ?? "Invalid value.";

          if (field && (field === "email" || field === "password")) {
            setError(field, { type: "server", message });
          }
        });
      }

      toast.error(res.message);
      return;
    }

    toast.success(res.message ?? "Signed in successfully.");
    router.push("/dashboard");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6.25">
      <fieldset
        disabled={isSubmitting}
        className="space-y-6.25 disabled:pointer-events-none disabled:opacity-60"
      >
        <div className="flex flex-col gap-3.75">
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            inputProps={register("email")}
            error={errors.email?.message}
          />

          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            inputProps={register("password")}
            error={errors.password?.message}
          />
        </div>

        <SubmitButton type="submit" isLoading={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign In"}
        </SubmitButton>

        <SubmitButton
          className="gap-2.5"
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={() => {
            toast.info("Google sign-in is not implemented yet.");
          }}
        >
          <FcGoogle size={24} />
          Sign in with google
        </SubmitButton>

        <AuthSwitchText
          text="Don't have an account?"
          linkText="Sign up"
          href="/signup"
        />
      </fieldset>
    </form>
  );
};

export default SignInForm;
