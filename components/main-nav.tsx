"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMainNav } from "@/components/mobile-main-nav";

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
  const pathName = usePathname();

  const routes = [
    {
      href: `/properties`,
      label: "Properties",
      active: pathName === `/properties`,
    },
    {
      href: `/visits`,
      label: "Visits",
      active: pathName === `/visits`,
    },
  ];

  return (
    <>
      <nav
        className={cn(
          "hidden lg:block items-center space-x-4 lg:space-x-6",
          className
        )}
      >
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
      <div className="block lg:hidden ml-4">
        <MobileMainNav />
      </div>
    </>
  );
}
