"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

export default function MagneticEffect({ children }) {
  const ref = useRef(null);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [isLeaving, setIsLeaving] = useState(false);

  const handleMouse = (e) => {
    setIsLeaving(false);

    const { clientX, clientY } = e;

    const {
      height = 0,
      width = 0,
      left = 0,
      top = 0,
    } = ref.current?.getBoundingClientRect() ?? {};

    const maxDistance = 120;
    const strength = 35;

    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    const distance = Math.sqrt(middleX ** 2 + middleY ** 2);

    const radius = clamp(distance, 0, maxDistance);

    const theta = Math.atan2(middleY, middleX);

    const force = radius / maxDistance;

    const x = Math.cos(theta) * force * strength;
    const y = Math.sin(theta) * force * strength;

    setPosition({ x, y });
  };

  const reset = () => {
    setIsLeaving(true);

    setPosition({
      x: 0,
      y: 0,
    });
  };

  return (
    <motion.div
      ref={ref}
          className="inline-flex"

      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={position}
      transition={
        isLeaving
          ? {
              type: "spring",
              stiffness: 100,
              damping: 2,
              mass: 0.16,
            }
          : {
              type: "tween",
              ease: "easeOut",
              duration: 0.1,
            }
      }
    >
      {children}
    </motion.div>
  );
}