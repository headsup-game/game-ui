import { Col, Flex, Row } from "antd";
import Image from "next/image";
import styles from "./Game.module.scss";
import FlipCard from "@components/FlipCard";

const FlopCards = () => {
  return (
    <Row className={styles.FlopCardsContainer}>
      <Col>
        <Flex>
          <Image
            src="/images/two_of_clubs.png"
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
          width={`100%`}
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
          width={`100%`}
          frontContent={
            <Image
              src="/images/seven_of_hearts.png"
              alt="two_of_clubs"
              width={200}
              height={170}
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
