import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  className = "",
  animate = true,
}) => {
  const baseClasses =
    "backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 shadow-lg overflow-hidden";

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${baseClasses} ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={`${baseClasses} ${className}`}>{children}</div>;
};

export default GlassContainer;
