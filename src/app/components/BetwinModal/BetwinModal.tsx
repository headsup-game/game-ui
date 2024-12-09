import { Col, Divider, Flex, Modal, Row, Typography } from "antd";
import styles from "./BetwinModal.module.scss";
import CommunityCards from "app/game/CommunityCards";
import { GameState } from "interfaces/gameState";
import GameTimer from "app/game/GameTimer";
import CardSet from "@components/CardSet";
import { Color, Rank, Suit, getCardNamesForPokerHandRank, getRankValue, getSortedCardsByRank } from "interfaces/card";
const { Text } = Typography;

const BetwinModal = ({
  open,
  setOpen,
  gameState,
  timer
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  gameState: GameState;
  timer: number;
}) => {
  return (
    <Modal
      open={open}
      centered
      title={null}
      footer={null}
      closable={true}
      closeIcon={<div className="text-white">x</div>}
      onCancel={() => setOpen(false)}
      className={styles.BetwinModal}
      width={630}
      styles={{
        content: {
          borderRadius: 24,
          border: "1px solid #312A5E",
          background: "#1F1C37",
          boxShadow: "0px 0px 97.6px 0px rgba(142, 72, 255, 0.30)",
          color: "#fff",
          padding: "40px 50px",
        },
      }}
    >
      <Flex justify="center" className={styles.Title}>{gameState.roundWinnerMessage}</Flex>
      <Flex vertical justify="center" align="center">
        {/* <Flex justify="center" className={styles.SubTitle}> */}
        {/*   {gameState.winningHandRank} */}
        {/* </Flex> */}
        <Flex justify="center" className={styles.SubTitle}>
          <CardSet isSmall={true} numberOfCards={gameState.winningCards.length} cards={getSortedCardsByRank(gameState.winningCards)} cardWidth={60} />
        </Flex>
      </Flex>
      <Divider className={styles.Divider} />
      <Row
        align={"middle"}
        justify={"space-between"}
        className={styles.GameCards}
      >
        <Col span={24}>
          <Flex vertical align="center" gap={10}>
            <Flex>
              <Text style={{ fontSize: '16px', fontWeight: '700', marginBottom: '0px', color: '#FAF9F6' }}>COMMUNITY CARDS</Text>
            </Flex>
            {/* Card Container */}
            <Flex
              className={`${styles.GameCardsContainer} ${styles.WinPercentageStripRed}`}
            >
              <Row gutter={14} style={{ width: "100%", margin: 0 }}>
                <Col span={24}>
                  <CardSet
                    isSmall={true}
                    numberOfCards={gameState.communityCards.length}
                    cards={gameState.communityCards}
                    cardWidth={50}
                  />
                </Col>
              </Row>
            </Flex>
          </Flex>
        </Col>
      </Row>
      <br />
      <Row
        align={"middle"}
        justify={"space-between"}
        className={styles.GameCards}
      >
        <Col span={12}>
          <Flex vertical align="center" gap={10}>
            <Flex>
              <Text style={{ fontSize: '16px', fontWeight: '700', marginBottom: '0px', color: '#FEBEBE' }}>APES</Text>
            </Flex>
            <Flex
              className={`${styles.WinPercentageStrip} ${styles.WinPercentageStripRed}`}
            >
              Bets - {gameState.apesData.totalBetAmounts}ETH
            </Flex>
            {/* Card Container */}
            <Flex
              className={`${styles.GameCardsContainer} ${styles.WinPercentageStripRed}`}
            >
              <Row gutter={14} style={{ width: "100%", margin: 0 }}>
                <Col span={24}>
                  <CardSet
                    isSmall={true}
                    numberOfCards={2}
                    cards={gameState.apesData.cards}
                    cardWidth={50}
                  />
                </Col>
              </Row>
            </Flex>
          </Flex>
        </Col>
        <Col span={12}>
          <Flex vertical align="center" gap={10}>
            <Flex>
              <Text style={{ fontSize: '16px', fontWeight: '700', marginBottom: '0px', color: '#C7BEFE' }}>PUNKS</Text>
            </Flex>
            <Flex
              className={`${styles.WinPercentageStrip} ${styles.WinPercentageStripRed}`}
            >
              Bets - {gameState.punksData.totalBetAmounts}ETH
            </Flex>
            {/* Card Container */}
            <Flex
              className={`${styles.GameCardsContainer} ${styles.WinPercentageStripBlue}`}
            >
              <Row gutter={14} style={{ width: "100%", margin: 0 }}>
                <Col span={24}>
                  <CardSet
                    isSmall={true}
                    numberOfCards={2}
                    cards={gameState.punksData.cards}
                    cardWidth={50}
                  />
                </Col>
              </Row>
            </Flex>
          </Flex>
        </Col>
      </Row>
      {/* <Flex vertical gap={24}> */}
      {/*   <Row justify="space-between"> */}
      {/*     <Col className={styles.ListHeading} span={18} style={{ display: 'flex', justifyContent: 'flex-start' }}> */}
      {/*       <Flex className={styles.ListHeading}> */}
      {/*         Apes Cards */}
      {/*       </Flex> */}
      {/*     </Col> */}
      {/*     <Col span={6} style={{ display: 'flex', justifyContent: 'flex-end' }}> */}
      {/*       <CardSet isSmall={true} numberOfCards={gameState.apesData.cards.length} cards={gameState.apesData.cards} cardWidth={40} /> */}
      {/*     </Col> */}
      {/*   </Row> */}
      {/*   <Row justify="space-between"> */}
      {/*     <Col className={styles.ListHeading} span={9} style={{ display: 'flex', justifyContent: 'flex-start' }}> */}
      {/*       <Flex className={styles.ListHeading}> */}
      {/*         Community Cards */}
      {/*       </Flex> */}
      {/*     </Col> */}
      {/*     <Col span={15} style={{ display: 'flex', justifyContent: 'flex-end' }}> */}
      {/*       <CardSet isSmall={true} numberOfCards={gameState.communityCards.length} cards={gameState.communityCards} cardWidth={40} /> */}
      {/*     </Col> */}
      {/*   </Row> */}
      {/*   <Row justify="space-between"> */}
      {/*     <Col className={styles.ListHeading} span={18} style={{ display: 'flex', justifyContent: 'flex-start' }}> */}
      {/*       <Flex className={styles.ListHeading}> */}
      {/*         Punks Cards */}
      {/*       </Flex> */}
      {/*     </Col> */}
      {/*     <Col span={6} style={{ display: 'flex', justifyContent: 'flex-end' }}> */}
      {/*       <CardSet isSmall={true} numberOfCards={gameState.punksData.cards.length} cards={gameState.punksData.cards} cardWidth={40} /> */}
      {/*     </Col> */}
      {/*   </Row> */}
      {/*   <Flex align="center" justify="space-between"> */}
      {/*     <Flex className={styles.ListHeading}> */}
      {/*       Apes Bet Pool */}
      {/*     </Flex> */}
      {/*     <Flex className={styles.ListValue}>{gameState.apesData.totalBetAmounts} ETH</Flex> */}
      {/*   </Flex> */}
      {/*   <Flex align="center" justify="space-between"> */}
      {/*     <Flex className={styles.ListHeading}> */}
      {/*       Punks Bet Pool */}
      {/*     </Flex> */}
      {/*     <Flex className={styles.ListValue}>{gameState.punksData.totalBetAmounts} ETH</Flex> */}
      {/*   </Flex> */}
      {/* </Flex> */}
      <Divider className={styles.Divider} />
      <Flex vertical gap={24}>
        <Flex align="center" justify="space-between">
          <Flex className={styles.ListHeading}>Your Win/Loss</Flex>
          <Flex className={`${styles.ListValue} ${styles.ListValueGreen}`}>
            {gameState.selfRoundWinningAmount}
          </Flex>
        </Flex>
        <Flex
          className={styles.ListHeading}
          justify="center"
          align="center"
          gap={8}
          style={{ marginTop: 10 }}
        >
          <Flex justify="center"><GameTimer timerMessage={gameState.currentMessage} timer={timer} /></Flex>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default BetwinModal;
