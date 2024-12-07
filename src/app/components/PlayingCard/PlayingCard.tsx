/* eslint-disable @next/next/no-page-custom-font */
"use client";
import styles from "./PlayingCard.module.scss";
import { Flex, Typography } from "antd";
import {
  Color,
  getRankValue,
  getSuitUnicodeSymbol,
  Rank,
  Suit,
} from "interfaces/card";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const { Text } = Typography;

interface PlayingCardProps {
  color: Color;
  value: Rank;
  suit: Suit;
  className?: string;
  onClick?: () => void;
  styles?: React.CSSProperties;
  isSmall: boolean;
  cardWidth?: number;
}

const PlayingCard = (props: PlayingCardProps) => {
  const { className, color, value, suit, onClick } = props;
  const playingCardRef = useRef<HTMLDivElement>(null);
  const [suitFontSize, setSuitFontSize] = useState<`${number}px`>("0px");
  const [valueFontSize, setValueFontSize] = useState<`${number}px`>("0px");

  useEffect(() => {
    const resize_ob = new ResizeObserver(() => {
      if (playingCardRef?.current != null) {
        const cardWidth =
          props.cardWidth == null
            ? playingCardRef.current.offsetWidth
            : props.cardWidth;
        setValueFontSize(`${cardWidth / 2}px`);
        setSuitFontSize(`${cardWidth / 3}px`);
      }
    });
    resize_ob.observe(playingCardRef.current as HTMLElement);

    return () => {
      resize_ob.disconnect();
    };
  });

  const getBGColor = (color: Color) => {
    switch (color) {
      case Color.RED:
        return "#FAF9F6";
      case Color.BLUE:
        return "#FAF9F6";
      case Color.VIOLET:
        return "#FAF9F6";
      case Color.BLACK:
        return "#000000";
      default:
        return "#FEBEBE";
    }
  };

  const getSuitColor = (suit: Suit): Color => {
    switch (suit) {
      case Suit.Hearts:
        return Color.RED;
      case Suit.Diamonds:
        return Color.BLUE;
      case Suit.Spades:
        return Color.BLACK;
      case Suit.Clubs:
        return Color.GREEN;
      default:
        return Color.BLACK;
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
      case Color.BLACK:
        return "#000000";
      case Color.GREEN:
        return "#5F8575";
      default:
        return "#FF4848";
    }
  };

  return (
    <>
      {value != Rank.None || suit != Suit.None || suit != Suit.None ? (
        <Flex
          ref={playingCardRef}
          className={`${className} ${styles.PlayingCard}`}
          align="center"
          justify="center"
          onClick={onClick}
          style={{
            ...props.styles,
            backgroundColor: getBGColor(color),
            userSelect: "none",
          }}
        >
          <Flex
            className={styles.PlayingCardText}
            style={{
              color: getColor(getSuitColor(suit)),
              fontSize: valueFontSize,
              userSelect: "none",
            }}
          >
            {getRankValue(value)}
          </Flex>

          <Flex
            style={{
              color: getColor(getSuitColor(suit)),
              fontSize: suitFontSize,
              userSelect: "none",
            }}
            className={styles.PlayingCardSuit}
          >
            {getSuitUnicodeSymbol(suit)}
          </Flex>

          <Flex
            style={{
              color: getColor(getSuitColor(suit)),
              fontSize: suitFontSize,
              userSelect: "none",
            }}
            className={styles.PlayingCardSuitInvert}
          >
            {getSuitUnicodeSymbol(suit)}
          </Flex>
        </Flex>
      ) : (
        <div ref={playingCardRef} className="w-full">
          <Image
            src="/images/card_back_side.svg"
            alt="unrevealed_card"
            width={63}
            height={88}
            style={{
              ...props.styles,
              backgroundColor: getBGColor(color),
              userSelect: "none",
              borderRadius: "6px",
            }}

          />
        </div>
      )}
    </>
  );
};

export default PlayingCard;
