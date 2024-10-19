import React, { memo } from "react";
import isEqual from "react-fast-compare";

import { cn } from "@/lib/utils";

import AppIcon from "./app-icon";

const AppLoading = memo(function AppLoading() {
  return (
    <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white delay-1000 duration-1000">
      <AppIcon
        src="/svg/circle-loading.svg"
        className="h-10 w-10 animate-spin text-primary md:h-20 md:w-20"
      />
    </div>
  );
}, isEqual);
AppLoading.displayName = "AppLoading";

const LoadingIcon = memo(function LoadingIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <AppIcon
      src="/svg/circle-loading.svg"
      className={cn("size-5 animate-spin text-primary", className)}
    />
  );
}, isEqual);
LoadingIcon.displayName = "LoadingIcon";

export { AppLoading, LoadingIcon };
