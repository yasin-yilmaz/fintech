"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { signup } from "@/lib/api/auth/actions";
import { AuthApiError } from "@/lib/api/auth/errors";

import { FormField } from "@/components/form/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";

import {
  signupDefaultValues,
  signUpSchema,
  TSignUpFormValues,
} from "@/schemas/auth.schema";

import { AuthSwitchText } from "./AuthSwitchText";

const SignUpForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: signupDefaultValues,
    mode: "onSubmit",
  });

  const onSubmit = async (values: TSignUpFormValues) => {
    try {
      const res = await signup(values);

      console.log("[authApi.signup] success:", res);

      toast.success(res.message ?? "Account created successfully.");
      router.push("/signin");
    } catch (err) {
      if (err instanceof AuthApiError) {
        console.log("[authApi.signup] error:", {
          message: err.message,
          code: err.code,
          details: err.details,
        });

        if (err.code === "VALIDATION_FAILED" && err.details?.length) {
          err.details.forEach((d) => {
            const field = d.field as keyof TSignUpFormValues | undefined;
            const message = d.message ?? "Invalid value.";

            if (field && ["fullName", "email", "password"].includes(field)) {
              setError(field, { type: "server", message });
            }
          });
        }

        toast.error(err.message);
        return;
      }

      console.log("[authApi.signup] unknown error:", err);

      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <fieldset
        disabled={isSubmitting}
        className="space-y-5 disabled:pointer-events-none disabled:opacity-60"
      >
        <FormField
          id="fullName"
          label="Full Name"
          placeholder="Mahfuzul Nabil"
          inputProps={register("fullName")}
          error={errors.fullName?.message}
        />

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

        <SubmitButton type="submit" isLoading={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Account"}
        </SubmitButton>

        <SubmitButton
          onClick={() => toast.info("Google sign-up is not implemented yet.")}
          type="button"
          variant="outline"
          disabled={isSubmitting}
        >
          <FcGoogle size={24} />
          Sign up with google
        </SubmitButton>

        <AuthSwitchText
          text="Already have an account?"
          linkText="Sign in"
          href="/signin"
        />
      </fieldset>
    </form>
  );
};

export default SignUpForm;
