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
    <div className="overlay">
      <div className="modal-content">
        {children}
        {(onCancel || onConfirm) && (
          <div className="button-container">
            {onConfirm && (
              <button className="confirm-btn" onClick={onConfirm}>
                {confirmText}
              </button>
            )}
            {onCancel && (
              <button className="cancel-btn" onClick={onCancel}>
                {cancelText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
