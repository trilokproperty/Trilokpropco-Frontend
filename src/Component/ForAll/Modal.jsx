import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "transparent",
            color: "#fff",
            fontSize: "1.5rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
