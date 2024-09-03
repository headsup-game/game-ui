/* eslint-disable @next/next/no-page-custom-font */
import styles from "./PlayingCard.module.scss";
import { Flex } from "antd";
import Image from "next/image";
import { Color, getRankValue, getSuitUnicodeSymbol, Rank, Suit } from "interfaces/card";
import { Span } from "next/dist/trace";

interface PlayingCardProps {
  color: Color;
  value: Rank;
  suit: Suit;
  className?: string;
  onClick?: () => void;
  styles?: React.CSSProperties;
}

const PlayingCard = (props: PlayingCardProps) => {
  const { className, color, value, suit, onClick } = props;

  const getBGColor = (color: Color) => {
    switch (color) {
      case Color.RED:
        return "#FEBEBE";
      case Color.BLUE:
        return "#C7BEFE";
      case Color.VIOLET:
        return "#E6BEFE";
      default:
        return "#FEBEBE";
    }
  };

  const getColor = (color: Color) => {
    switch (color) {
      case Color.RED:
        return "#FF4848";
      case Color.BLUE:
        return "#4865FF";
      case Color.VIOLET:
        return "#8E48FF";
      default:
        return "#FF4848";
    }
  };

  const getSuitIcon = ({
    suit = Suit.Clubs,
    color = Color.RED,
  }: {
    suit: Suit;
    color: Color;
  }): string => {
    const suitIcons = {
      "Clubs": {
        0: "/images/card-assets/clubs-red.svg",
        1: "/images/card-assets/clubs-blue.svg",
        2: "/images/card-assets/clubs-violet.svg",
      },
      "Diamonds": {
        0: "/images/card-assets/diamonds-red.svg",
        1: "/images/card-assets/diamonds-blue.svg",
        2: "/images/card-assets/diamonds-violet.svg",
      },
      "Hearts": {
        0: "/images/card-assets/hearts-red.svg",
        1: "/images/card-assets/hearts-blue.svg",
        2: "/images/card-assets/hearts-violet.svg",
      },
      "Spades": {
        0: "/images/card-assets/spades-red.svg",
        1: "/images/card-assets/spades-blue.svg",
        2: "/images/card-assets/spades-violet.svg",
      },
      "None": {
        0: "",
        1: "",
        2: "",
      }
    };

    return suitIcons[suit]?.[color] || "";
  };

  return (
    <Flex
      className={`${className} ${styles.PlayingCard}`}
      align="center"
      justify="center"
      onClick={onClick}
      style={{
        ...props.styles,
        backgroundColor: getBGColor(color),
      }}
    >
      {value != Rank.None && <Flex
        className={styles.PlayingCardText}
        style={{
          color: getColor(color),
        }}
      >
        {getRankValue(value)}
      </Flex>}
      {suit != Suit.None && (
        <Flex style={{color: getColor(color)}} className={styles.PlayingCardSuit}>{getSuitUnicodeSymbol(suit)}</Flex>
        // <Image
        //   src={getSuitIcon({ suit, color })}
        //   alt="hearts"
        //   width={40}
        //   height={40}
        //   className={styles.PlayingCardSuit}
        // />
      )}
      {suit != Suit.None && (
        <Flex style={{color: getColor(color)}} className={styles.PlayingCardSuitInvert}>{getSuitUnicodeSymbol(suit)}</Flex>
        // <Image
        //   src={getSuitIcon({ suit, color })}
        //   alt="hearts"
        //   width={40}
        //   height={40}
        //   className={styles.PlayingCardSuitInvert}
        // />
      )}
    </Flex>
  );
};

export default PlayingCard;
