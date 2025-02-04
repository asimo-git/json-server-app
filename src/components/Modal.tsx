interface ModalProps {
  onCancel: () => void;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
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
        <div className="button-container">
          <button className="confirm-btn" onClick={onConfirm}>
            {confirmText}
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
