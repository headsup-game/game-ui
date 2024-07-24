"use client";

import { Flex } from "antd";
import PlayingCard from "app/components/PlayingCard/PlayingCard";
import React from "react";

const CardCombinationsPage = () => {
  const suits = ["SPADES", "DIAMONDS", "HEARTS", "CLUBS"];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
  const colors = ["red", "blue", "violet"];

  return (
    <Flex align="center" justify="center" wrap gap={20}>
      {colors.map((color) => (
        <Flex align="center" justify="center" wrap gap={20} key={color}>
          {suits.map((suit) => (
            <div key={suit}>
              {values.map((value) => (
                <PlayingCard
                  key={`${value}-${suit}`}
                  value={value}
                  suit={suit}
                  color={color}
                />
              ))}
            </div>
          ))}
        </Flex>
      ))}
    </Flex>
  );
};

export default CardCombinationsPage;
