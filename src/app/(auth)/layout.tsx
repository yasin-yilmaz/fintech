import { PropsWithChildren } from "react";

import Image from "next/image";

import { Logo } from "@/components/brand/Logo";

type Props = PropsWithChildren;

export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* left side */}
        <div className="flex flex-col px-6 py-10 lg:px-14">
          <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-8 lg:gap-0">
            {/* logo */}
            <div className="flex items-center">
              <Logo className="bg-granite h-7.5 w-27" />
            </div>

            {/* content */}
            <div className="flex flex-1 items-center">
              <div className="w-full">{children}</div>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="relative hidden lg:block">
          <Image
            src="/auth-side.jpg"
            alt="Auth visual"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-zinc-100/40" />
        </div>
      </div>
    </div>
  );
}
