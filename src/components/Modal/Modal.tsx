import styles from "./Modal.module.css";

interface ModalProps {
  onCancel?: () => void;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

export function Modal({
  onCancel,
  children,
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  onConfirm,
}: ModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        {children}
        {(onCancel || onConfirm) && (
          <div className="flex-container">
            {onConfirm && (
              <button className={styles.confirmBtn} onClick={onConfirm}>
                {confirmText}
              </button>
            )}
            {onCancel && (
              <button className={styles.cancelBtn} onClick={onCancel}>
                {cancelText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
