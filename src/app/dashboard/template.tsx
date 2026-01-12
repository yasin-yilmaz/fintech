"use client";

import { PropsWithChildren } from "react";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

type Props = PropsWithChildren;

export default function Template({ children }: Props) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
