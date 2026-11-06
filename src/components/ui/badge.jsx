import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-[#FCBC5B]/45 bg-[#FCBC5B]/15 text-[#FCBC5B]",
        gold:
          "border-[#FCBC5B] bg-[#FCBC5B] text-[#140B29] font-bold shadow-sm",
        secondary:
          "border-[#140B29]/20 bg-[#140B29] text-[#FCBC5B] font-bold",
        cream:
          "border-[#FFEEDF]/30 bg-[#140B29]/90 text-[#FFEEDF]",
        rose:
          "border-[#FF7EB6]/50 bg-[#FF7EB6]/20 text-[#FF7EB6]",
        outline:
          "border-[#FFEEDF]/30 text-[#FFEEDF] bg-white/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
