import { useEffect } from "react";
import { Notification } from "../utils/interfaces";

interface PopUpProps {
  notification: Notification;
  onClose: () => void;
  delay?: number;
}

export function PopUp({ notification, onClose, delay = 3000 }: PopUpProps) {
  useEffect(() => {
    setTimeout(() => onClose(), delay);
  }, []);

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  );
}
