import PropTypes from "prop-types";
import "./ConfirmModal.css";
import { useEffect, useRef } from "react";

function ConfirmModal(props) {
  const {
    show,
    title,
    message,
    confirmLabel,
    confirmVariant,
    onConfirm,
    onCancel,
  } = props;

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (show) {
      cancelButtonRef.current?.focus();
    }
  }, [show]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onCancel();
      }
    }

    if (show) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [show, onCancel]);

  if (!show) {
    return null;
  }

  return (
    <div
      className="confirm-modal-backdrop"
      role="presentation"
      onClick={onCancel}
    >
      <div
        className="confirm-modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="confirm-modal-title mb-0" id="confirm-modal-title">
            {title}
          </h3>

          <button
            type="button"
            className="btn btn-light border"
            onClick={onCancel}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <p className="confirm-modal-message">{message}</p>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            ref={cancelButtonRef}
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className={`btn btn-${confirmVariant || "danger"}`}
            onClick={onConfirm}
          >
            {confirmLabel || "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  confirmVariant: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmModal;
