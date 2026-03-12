import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type RevealDirection =
  | "up"
  | "left"
  | "right"
  | "scale"
  | "fade-up"
  | "fade-left"
  | "fade-right"
  | "fade-scale";

type RevealProps = {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  amount?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

function normalizeDirection(direction: RevealDirection) {
  if (direction === "fade-up") return "up";
  if (direction === "fade-left") return "left";
  if (direction === "fade-right") return "right";
  if (direction === "fade-scale") return "scale";
  return direction;
}

function getHiddenState(direction: RevealDirection) {
  const normalizedDirection = normalizeDirection(direction);

  if (normalizedDirection === "left") {
    return { opacity: 0, x: -40 };
  }

  if (normalizedDirection === "right") {
    return { opacity: 0, x: 40 };
  }

  if (normalizedDirection === "scale") {
    return { opacity: 0, y: 16, scale: 0.96 };
  }

  return { opacity: 0, y: 40 };
}

function Reveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.7,
  amount = 0.2,
  ...rest
}: RevealProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(rootRef, { amount, once: false });

  if (reduceMotion) {
    return (
      <motion.div className={className} {...rest}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={rootRef}
      className={className}
      {...rest}
      initial={getHiddenState(direction)}
      animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : getHiddenState(direction)}
      transition={{ duration, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
