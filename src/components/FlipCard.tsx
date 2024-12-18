import React, { useEffect, useRef, useState } from "react";
import { delay, motion, MotionStyle, useSpring } from "framer-motion";
import Image from "next/image";
import styles from "app/game/Game.module.scss";

export interface FlipCardProps {
  frontContent: JSX.Element;
  width?: string | number;
  height?: string | number;
  backContent?: JSX.Element;
  initFaceDown?: boolean;
  style?: React.CSSProperties;
  animationDelay?: number;
}

const FlipCard: React.FC<FlipCardProps> = ({
  width = 108,
  height = 158,
  frontContent,
  style = {},
  initFaceDown = true,
  animationDelay = 0,
  backContent = (
    <Image
      src="/images/card_back_side.svg"
      alt="two_of_clubs"
      width={63}
      height={88}
      className={styles.FlopCard}
    />
  ),
}) => {
  const [isFlipped, setIsFlipped] = useState(initFaceDown);
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

  // const handleClick = () => setIsFlipped(!isFlipped);
  const handleClick = () => {};

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

  useEffect(() => {
    setIsFlipped(initFaceDown);
  }, [initFaceDown]);


  return (
		<motion.div
			onClick={handleClick}
			transition={spring}
			style={{
				perspective: "400px",
				transformStyle: "preserve-3d",
				display: "flex",
				aspectRatio: "63/88",
				...style,
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
        className="group [perspective:2000px]"
			>
				<div className="relative transition-all duration-300 [transform-style:preserve-3d] cursor-pointer">
					<motion.div
						animate={{
							rotateY: isFlipped ? 0 : 180,
						}}
						className="w-full h-full [backface-visibility:hidden]"
					>
						{backContent}
					</motion.div>
					<motion.div
						animate={{
							rotateY: isFlipped ? 180 : 0,
						}}
						className="absolute inset-0 w-full h-full [backface-visibility:hidden]"
					>
						{frontContent}
					</motion.div>
				</div>
			</motion.div>
		</motion.div>
  );
};

export default FlipCard;
