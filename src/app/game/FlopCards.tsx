import { Col, Flex, Row } from "antd";
import Image from "next/image";
import styles from "./Game.module.scss";
import FlipCard from "@components/FlipCard";
import PlayingCard from "app/components/PlayingCard/PlayingCard";
import { Color, Rank, Suit } from "interfaces/card";

const FlopCards = () => {
  return (
    <Row className={styles.FlopCardsContainer} align={"middle"}>
      <Col>
        <FlipCard
          width={"100%"}
          frontContent={
            <PlayingCard
              color={Color.RED}
              value={Rank.Ace}
              suit={Suit.Diamonds}
              className={styles.FlopCard}
              styles={{
                width: "100%",
              }}
            />
          }
        />
      </Col>
      <Col>
        <Flex>
          <Image
            src="/images/ten_of_spades.png"
            alt="two_of_clubs"
            width={200}
            height={170}
            className={styles.FlopCard}
          />
        </Flex>
      </Col>
      <Col>
        <Flex>
          <Image
            src="/images/seven_of_hearts.png"
            alt="two_of_clubs"
            width={200}
            height={170}
            className={styles.FlopCard}
          />
        </Flex>
      </Col>
      <Col>
        <FlipCard
          width={"100%"}
          frontContent={
            <Image
              src="/images/ace_of_diamonds.png"
              alt="two_of_clubs"
              width={200}
              height={170}
              className={styles.FlopCard}
            />
          }
          backContent={
            <Image
              src="/images/card_back_side.svg"
              alt="two_of_clubs"
              width={200}
              height={170}
              className={styles.FlopCard}
            />
          }
        />
      </Col>
      <Col>
        <FlipCard
          width={"100%"}
          frontContent={
            <Image
              src="/images/seven_of_hearts.png"
              alt="two_of_clubs"
              width={200}
              height={170}
              className={styles.FlopCard}
            />
          }
          backContent={
            <Image
              src="/images/card_back_side.svg"
              alt="two_of_clubs"
              width={200}
              height={170}
              className={styles.FlopCard}
            />
          }
        />
      </Col>
    </Row>
  );
};

export default FlopCards;
