"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

import { FormField } from "@/components/form/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";

import { AuthSwitchText } from "./AuthSwitchText";

const SignUpForm = () => {
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/signin");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <FormField
        id="fullName"
        label="Full Name"
        type="text"
        placeholder="Mahfuzul Nabil"
      />

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

      <SubmitButton type="submit">Create Account</SubmitButton>

      <SubmitButton className="gap-2.5" type="button" variant="outline">
        <FcGoogle size={24} />
        Sign up with google
      </SubmitButton>

      <AuthSwitchText
        text="Already have an account?"
        linkText="Sign in"
        href="/signin"
      />
    </form>
  );
};

export default SignUpForm;
