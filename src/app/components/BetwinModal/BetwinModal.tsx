import { Divider, Flex, Modal } from "antd";
import styles from "./BetwinModal.module.scss";
import CommunityCards from "app/game/CommunityCards";

const BetwinModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Modal
      open={open}
      title={null}
      footer={null}
      closable={false}
      closeIcon={null}
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
      <Flex justify="center" className={styles.Title}>
        Blue Wins
      </Flex>
      {/* Winining Card Sets */}
      <CommunityCards />

      <Flex justify="center" className={styles.SubTitle}>
        by a Straight Flush
      </Flex>
      <Divider className={styles.Divider} />
      <Flex vertical gap={24}>
        {/* Total Amount Pooled */}
        <Flex align="center" justify="space-between">
          <Flex className={styles.ListHeading}>
            Total Amount Pooled for Blue
          </Flex>
          <Flex className={styles.ListValue}>123.5 ETH</Flex>
        </Flex>
        {/* Total Bets */}
        <Flex align="center" justify="space-between">
          <Flex className={styles.ListHeading}>Total Bets on Red</Flex>
          <Flex className={styles.ListValue}>18</Flex>
        </Flex>
        {/* Winnings per Person */}
        <Flex align="center" justify="space-between">
          <Flex className={styles.ListHeading}>Winnings per Person</Flex>
          <Flex className={styles.ListValue}>7.23 ETH</Flex>
        </Flex>
      </Flex>

      <Divider className={styles.Divider} />
      <Flex vertical gap={24}>
        {/* Your Win/Loss */}
        <Flex align="center" justify="space-between">
          <Flex className={styles.ListHeading}>Your Win/Loss</Flex>
          <Flex className={`${styles.ListValue} ${styles.ListValueGreen}`}>
            123.5 ETH
          </Flex>
        </Flex>
        {/* Current Balance */}
        <Flex align="center" justify="space-between">
          <Flex className={styles.ListHeading}>Current Balance</Flex>
          <Flex className={styles.ListValue}>91 ETH</Flex>
        </Flex>
        <Flex
          className={styles.ListHeading}
          align="center"
          gap={8}
          style={{ marginTop: 10 }}
        >
          <Flex className={styles.SubTitle}>Next round starts in</Flex> 10
          seconds!
        </Flex>
      </Flex>
    </Modal>
  );
};

export default BetwinModal;
