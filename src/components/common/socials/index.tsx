import React, { memo } from "react";
import isEqual from "react-fast-compare";
import Image from "next/image";

import { cn } from "@/lib/utils";

import AppLink from "../app-link";

import { getSocial } from "./constants";

function Socials({ className }: { className?: string }) {
  return (
    <nav className={cn("flex gap-5", className)}>
      {getSocial().map((item) => (
        <AppLink key={item.label} href={item.href} aria-label={item.label}>
          <Image src={item.icon} width={20} height={20} alt={item.label} />
        </AppLink>
      ))}
    </nav>
  );
}

export default memo(Socials, isEqual);
