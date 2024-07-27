/* eslint-disable @next/next/no-page-custom-font */
import { Rammetto_One } from "next/font/google";
import styles from "./PlayingCard.module.scss";
import { Flex } from "antd";
import Image from "next/image";

export type SUITS = "SPADES" | "HEARTS" | "CLUBS" | "DIAMONDS";
export type CardValue = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "J" | "Q" | "K" | "A";
export type Color = "red" | "blue" | "violet";

interface PlayingCardProps {
  color: Color;
  value: CardValue;
  suit: SUITS;
  className?: string;
  onClick?: () => void;
}

const ramettoOne = Rammetto_One({ subsets: ["latin"], weight: "400" });

const PlayingCard = (props: PlayingCardProps) => {
  const { className, color, value, suit, onClick } = props;

  const getBGColor = (color) => {
    switch (color) {
      case "red":
        return "#FEBEBE";
      case "blue":
        return "#C7BEFE";
      case "violet":
        return "#E6BEFE";
      default:
        return "#FEBEBE";
    }
  };

  const getColor = (color) => {
    switch (color) {
      case "red":
        return "#FF4848";
      case "blue":
        return "#4865FF";
      case "violet":
        return "#8E48FF";
      default:
        return "#FF4848";
    }
  };

  const getSuitIcon = (suit = "CLUBS", color = "red") => {
    const suitIcons = {
      HEARTS: {
        red: "/images/card-assets/hearts-red.svg",
        blue: "/images/card-assets/hearts-blue.svg",
        violet: "/images/card-assets/hearts-violet.svg",
      },
      CLUBS: {
        red: "/images/card-assets/clubs-red.svg",
        blue: "/images/card-assets/clubs-blue.svg",
        violet: "/images/card-assets/clubs-violet.svg",
      },
      DIAMONDS: {
        red: "/images/card-assets/diamonds-red.svg",
        blue: "/images/card-assets/diamonds-blue.svg",
        violet: "/images/card-assets/diamonds-violet.svg",
      },
      SPADES: {
        red: "/images/card-assets/spades-red.svg",
        blue: "/images/card-assets/spades-blue.svg",
        violet: "/images/card-assets/spades-violet.svg",
      },
    };

    const suitIcon = suitIcons[suit]?.[color] || suitIcons["CLUBS"]["red"];

    return suitIcon;
  };

  return (
    <Flex
      className={`${styles.PlayingCard} ${className}`}
      align="center"
      justify="center"
      style={{
        backgroundColor: getBGColor(color),
      }}
    >
      <Flex
        className={styles.PlayingCardText}
        style={{
          color: getColor(color),
        }}
      >
        {value}
      </Flex>
      <Image
        src={getSuitIcon(suit, color)}
        alt="hearts"
        width={40}
        height={40}
        className={styles.PlayingCardSuit}
      />
      <Image
        src={getSuitIcon(suit, color)}
        alt="hearts"
        width={40}
        height={40}
        className={styles.PlayingCardSuitInvert}
      />
    </Flex>
  );
};

export default PlayingCard;
