import type { ReactNode } from "react";
import { motion } from "framer-motion";

type SlideInLeftProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
};

function SlideInLeft({
  children,
  className,
  delay = 0,
  duration = 1,
  distance = 100,
}: SlideInLeftProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -distance }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default SlideInLeft;
