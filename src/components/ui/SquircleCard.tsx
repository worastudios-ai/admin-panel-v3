import * as React from "react";
import { motion } from "framer-motion";

export interface SquircleCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  layoutId?: string;
}

export const SquircleCard = React.forwardRef<
  HTMLDivElement,
  SquircleCardProps
>(({ className = "", layoutId, ...props }, ref) => (
  <motion.div
    ref={ref}
    layoutId={layoutId}
    className={`rounded-squircle-lg border border-white/10 bg-glass-surface/80 p-6 backdrop-blur ${className}`}
    {...props}
  />
));

SquircleCard.displayName = "SquircleCard";
