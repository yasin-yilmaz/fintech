"use client";

import { useEffect } from "react";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

import { useUIStore } from "@/store/ui.store";

import { DashboardSidebarContent } from "./DashboardSidebar";

type Props = { activeKey?: string };

export const DashboardSidebarMobile = ({ activeKey = "dashboard" }: Props) => {
  const pathname = usePathname();
  const isOpen = useUIStore((state) => state.isSidebarOpen);
  const close = useUIStore((state) => state.closeSidebar);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) return;
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {/* overlay */}
          <motion.button
            type="button"
            aria-label="Close sidebar"
            onClick={close}
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          />

          {/* panel */}
          <motion.aside
            className="bg-surface-2 absolute inset-y-0 left-0 w-62.5 shadow-lg"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
          >
            <DashboardSidebarContent activeKey={activeKey} />
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
