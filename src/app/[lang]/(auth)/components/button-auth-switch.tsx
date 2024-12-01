"use client";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
export default function ButtonAuthSwitch() {
  const pathname = usePathname();
  const lastPart = pathname.split("/")[pathname.split("/").length - 1];
  const handleNavigate = () => {
  };

  return (
    <>
      {lastPart === "register" && (
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          Login
        </Link>
      )}
      {lastPart === "login" && (
        <Link
          href="/register"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          register
        </Link>
      )}
    </>
  );
}
