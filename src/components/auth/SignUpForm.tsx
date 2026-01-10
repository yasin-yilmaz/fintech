"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { sleep } from "@/lib/dev/utils";

import { FormField } from "@/components/form/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";

import { AuthSwitchText } from "./AuthSwitchText";

const signUpSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters.")
    .max(60),
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type TSignUpFormValues = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { fullName: "", email: "", password: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (values: TSignUpFormValues) => {
    try {
      await sleep(1000);

      if (values.email.endsWith("@test.com")) {
        throw new Error("This email domain is not allowed.");
      }

      toast.success("Account created successfully.");
      router.push("/signin");
    } catch (err) {
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
          onClick={() => {
            toast.info("Google sign-up is not implemented yet.");
          }}
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
