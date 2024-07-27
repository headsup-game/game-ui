"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, MotionStyle, useSpring } from "framer-motion";

interface FlipCardProps {
  width?: string | number;
  height?: string | number;
  frontContent: JSX.Element;
  backContent: JSX.Element;
}

const FlipCard: React.FC<FlipCardProps> = ({
  width = 108,
  height = 158,
  frontContent,
  backContent,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef(null);

  const flipCardStyle: MotionStyle = {
    width,
    height,
    position: "relative",
    transformStyle: "preserve-3d",
    perspective: 1000,
  };

  const cardVariant = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  const handleClick = () => setIsFlipped(!isFlipped);

  const [rotateXaxis, setRotateXaxis] = useState(0);
  const [rotateYaxis, setRotateYaxis] = useState(0);

  const handleMouseMove = (event) => {
    const element: any = ref?.current;
    if (element) {
      const elementRect = element?.getBoundingClientRect();
      const elementWidth = elementRect.width;
      const elementHeight = elementRect.height;
      const elementCenterX = elementWidth / 2;
      const elementCenterY = elementHeight / 2;
      const mouseX = event.clientY - elementRect.y - elementCenterY;
      const mouseY = event.clientX - elementRect.x - elementCenterX;
      const degreeX = (mouseX / elementWidth) * 20; //The number is the rotation factor
      const degreeY = (mouseY / elementHeight) * 20; //The number is the rotation factor
      setRotateXaxis(degreeX);
      setRotateYaxis(degreeY);
    }
  };

  const handleMouseEnd = () => {
    setRotateXaxis(0);
    setRotateYaxis(0);
  };
  const spring = {
    type: "spring",
    stiffness: 300,
    damping: 40,
  };

  const dx = useSpring(0, spring);
  const dy = useSpring(0, spring);

  useEffect(() => {
    dx.set(-rotateXaxis);
    dy.set(rotateYaxis);
  }, [rotateXaxis, rotateYaxis]);

  return (
    <motion.div
      onClick={handleClick}
      transition={spring}
      style={{
        perspective: "400px",
        transformStyle: "preserve-3d",
        width: width,
        display: "flex",
        aspectRatio: "63/88",
      }}
    >
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.1 }} //Change the scale of zooming in when hovering
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseEnd}
        transition={spring}
        style={{
          width: "100%",
          height: "100%",
          rotateX: dx,
          rotateY: dy,
        }}
      >
        <div
          style={{
            perspective: "400px",
            transformStyle: "preserve-3d",
            width: "100%",
            height: "100%",
          }}
        >
          <motion.div
            animate={{ rotateY: isFlipped ? -180 : 0 }}
            transition={spring}
            style={{
              width: "100%",
              height: "100%",
              zIndex: isFlipped ? 0 : 1,
              backfaceVisibility: "hidden",
              position: "absolute",
              aspectRatio: "63/88",
            }}
          >
            {frontContent}
          </motion.div>
          <motion.div
            initial={{ rotateY: 180 }}
            animate={{ rotateY: isFlipped ? 0 : 180 }}
            transition={spring}
            style={{
              width: "100%",
              height: "100%",
              zIndex: isFlipped ? 1 : 0,
              backfaceVisibility: "hidden",
              position: "absolute",
              aspectRatio: "63/88",
            }}
          >
            {backContent}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FlipCard;
