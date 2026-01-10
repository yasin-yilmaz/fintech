"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { sleep } from "@/lib/dev/utils";

import { SubmitButton } from "@/components/ui/SubmitButton";

import { FormField } from "../form/FormField";
import { AuthSwitchText } from "./AuthSwitchText";

const signInSchema = z.object({
  email: z.email("Please enter a valid email."),

  password: z
    .string("Incorrect password.")
    .min(6, "Password must be at least 6 characters."),
});

type TSignInFormValues = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: TSignInFormValues) => {
    try {
      await sleep(800);

      // test
      const ok =
        values.email.toLowerCase() === "demo@gmail.com" &&
        values.password === "123456";

      if (!ok) {
        throw new Error("Email or password is incorrect.");
      }

      toast.success("Signed in successfully.");
      router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      toast.error(message);
    }
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
