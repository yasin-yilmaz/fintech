"use client";

import type { PropsWithChildren } from "react";
import { useSyncExternalStore } from "react";

import { createPortal } from "react-dom";

type Props = PropsWithChildren<{
  container?: Element | null;
}>;

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export const Portal = ({ children, container }: Props) => {
  const isClient = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  if (!isClient) return null;

  return createPortal(children, container ?? document.body);
};
