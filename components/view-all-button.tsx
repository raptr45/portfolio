"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface ViewAllButtonProps {
  href: string;
  children?: React.ReactNode;
}

export function ViewAllButton({ href, children }: ViewAllButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isHovered, setIsHovered] = useState(false);

  // Prefetch on mount for instant navigation
  useEffect(() => {
    router.prefetch(href);
  }, [href, router]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isPending}
      className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg bg-brand-multi text-white shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/40 disabled:opacity-75 cursor-pointer disabled:cursor-wait"
      aria-label={`Navigate to ${href}`}
    >
      {isPending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          {children || "View All"}
          <span className="text-xl" aria-hidden>
            →
          </span>
        </>
      )}
    </button>
  );
}
