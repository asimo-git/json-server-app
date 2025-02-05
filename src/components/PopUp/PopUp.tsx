import { useEffect } from "react";
import { Notification } from "../../utils/interfaces";
import styles from "./PopUp.module.css";

interface PopUpProps {
  notification: Notification;
  onClose: () => void;
  delay?: number;
}

export function PopUp({ notification, onClose, delay = 3000 }: PopUpProps) {
  useEffect(() => {
    setTimeout(() => onClose(), delay);
  }, [delay, onClose]);

  return (
    <div className={`${styles.notification} ${styles[notification.type]}`}>
      {notification.message}
    </div>
  );
}
