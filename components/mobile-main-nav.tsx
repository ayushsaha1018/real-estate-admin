"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlignJustify, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

export function MobileMainNav() {
  const pathName = usePathname();
  const closeBtn = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const routes = [
    {
      href: `/properties`,
      label: "Properties",
      active: pathName === `/properties`,
    },
    // {
    //   href: `/visits`,
    //   label: "Visits",
    //   active: pathName === `/visits`,
    // },
  ];

  const navigate = (url: string) => {
    if (closeBtn.current) closeBtn.current.click();
    router.push(url);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="py-0 px-[0.6rem] h-[2.2rem]">
          <AlignJustify className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-[100vh] left-0 translate-x-0 max-w-[250px]">
        <div ref={closeBtn} className="absolute right-4 top-2">
          <AlertDialogCancel className="border-0">
            <X className="w-5 h-5" />
          </AlertDialogCancel>
        </div>
        <nav className="flex flex-col items-start space-y-4 pl-5 pt-4">
          {routes.map((route) => (
            <AlertDialogAction key={route.href}>
              <p
                onClick={() => navigate(route.href)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  route.active
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
                )}
              >
                {route.label}
              </p>
            </AlertDialogAction>
          ))}
        </nav>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
