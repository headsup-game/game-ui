'use client'

/* eslint-disable @next/next/no-page-custom-font */
import styles from "./PlayingCard.module.scss";
import { Flex, Typography } from "antd";
import { Color, getRankValue, getSuitUnicodeSymbol, Rank, Suit } from "interfaces/card";
import { useEffect, useRef, useState } from "react";

const { Text } = Typography;

interface PlayingCardProps {
  color: Color;
  value: Rank;
  suit: Suit;
  className?: string;
  onClick?: () => void;
  styles?: React.CSSProperties;
  isSmall: boolean
}

const PlayingCard = (props: PlayingCardProps) => {
  const { className, color, value, suit, onClick } = props;
  const playingCardRef = useRef<HTMLElement>(null);
  const [suitFontSize, setSuitFontSize] = useState('0px');
  const [valueFontSize, setValueFontSize] = useState('0px');

  useEffect(() => {
    if (playingCardRef?.current != null) {
      const cardWidth = playingCardRef.current.offsetWidth;
      setValueFontSize(`${props.isSmall ? 10 : cardWidth / 2}px`);
      setSuitFontSize(`${props.isSmall ? 10 : cardWidth / 3}px`);
      console.log('cardWidth', cardWidth);
    }
  })

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

  return (
    <>
      {!props.isSmall ? (
        <Flex
          ref={playingCardRef}
          className={`${className} ${styles.PlayingCard}`}
          align="center"
          justify="center"
          onClick={onClick}
          style={{
            ...props.styles,
            backgroundColor: getBGColor(color),
          }}
        >
          {value != Rank.None &&
            <Flex className={styles.PlayingCardText} style={{ color: getColor(color), fontSize: valueFontSize }}>
              {getRankValue(value)}
            </Flex>}
          {suit != Suit.None && (
            <Flex style={{ color: getColor(color), fontSize: suitFontSize }} className={styles.PlayingCardSuit}>{getSuitUnicodeSymbol(suit)}</Flex>
          )}
          {suit != Suit.None && (
            <Flex style={{ color: getColor(color), fontSize: suitFontSize }} className={styles.PlayingCardSuitInvert}>{getSuitUnicodeSymbol(suit)}</Flex>
          )}
        </Flex>
      ) : (
        <Flex justify="center" align="center" style={{ padding: "0px" }}>
          {value != Rank.None &&
            <Text className={styles.PlayingCardSmallText} style={{ opacity: '1', color: getColor(color), fontSize: '20px' }}>
              {getRankValue(value)}
            </Text>}
          {suit != Suit.None && (
            <Text style={{ color: getColor(color), fontSize: '20px', opacity: '1' }} className={styles.PlayingCardSmallSuit}>{getSuitUnicodeSymbol(suit)}</Text>
          )}
        </Flex>
      )}
    </>
  );
};

export default PlayingCard;
