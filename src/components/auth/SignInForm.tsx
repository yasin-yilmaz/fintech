"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

import { AUTH_COOKIE } from "@/lib/auth";

import { SubmitButton } from "@/components/ui/SubmitButton";

import { FormField } from "../form/FormField";
import { AuthSwitchText } from "./AuthSwitchText";

const SignInForm = () => {
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    document.cookie = `${AUTH_COOKIE}=demo; Path=/; SameSite=Lax`;

    router.push("/dashboard");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6.25">
      <div className="flex flex-col gap-3.75">
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="example@gmail.com"
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
        />
      </div>

      <SubmitButton type="submit">Sign In</SubmitButton>

      <SubmitButton className="gap-2.5" type="button" variant="outline">
        <FcGoogle size={24} />
        Sign in with google
      </SubmitButton>

      <AuthSwitchText
        text="Don't have an account?"
        linkText="Sign up"
        href="/signup"
      />
    </form>
  );
};

export default SignInForm;
