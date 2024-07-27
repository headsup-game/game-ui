import { Modal } from "antd";
import styles from "./BetwinModal.module.scss";

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
      onCancel={() => setOpen(false)}
      className={styles.BetwinModal}
    >
      BetwinModal
    </Modal>
  );
};

export default BetwinModal;
