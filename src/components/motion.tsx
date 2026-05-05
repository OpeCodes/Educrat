import { Box, Flex, Heading, Text, Button, Image, Tag } from "@chakra-ui/react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
  Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const MotionBox = motion(Box);
export const MotionFlex = motion(Flex);
export const MotionHeading = motion(Heading);
export const MotionText = motion(Text);
export const MotionButton = motion(Button);
export const MotionImage = motion(Image);
export const MotionTag = motion(Tag);

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 12 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 18 },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger = (gap = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: gap, delayChildren },
  },
});

export const wordStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

export const wordItem: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -45 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const float = {
  animate: {
    y: [0, -14, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

export const orbDrift = (delay = 0) => ({
  animate: {
    x: [0, 30, -20, 0],
    y: [0, -20, 30, 0],
    scale: [1, 1.1, 0.95, 1],
    transition: {
      duration: 14,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  },
});

export const AnimatedCount = ({
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) =>
    Number.isInteger(to) ? Math.round(v).toLocaleString() : v.toFixed(1)
  );
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, to, value, rounded, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

export const useMotionPrefs = () => {
  const reduce = useReducedMotion();
  return { reduce: !!reduce };
};
