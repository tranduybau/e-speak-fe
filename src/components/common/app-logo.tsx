import React, { memo } from "react";
import isEqual from "react-fast-compare";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { HTMLTypeWithoutRefHasClassNameOptional } from "@/types/common";

function AppLogo({
  className,
  ...rest
}: HTMLTypeWithoutRefHasClassNameOptional<HTMLDivElement>) {
  return (
    <div
      className={cn("aspect-[195/56] max-w-[12.1875rem]", className)}
      {...rest}
    >
      <Image
        src="/images/app/logo.svg"
        width={195}
        height={56}
        alt="logo"
        className="block h-full w-full object-contain"
      />
    </div>
  );
}

export default memo(AppLogo, isEqual);
