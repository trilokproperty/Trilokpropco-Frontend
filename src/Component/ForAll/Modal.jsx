import React, { useState } from "react";

const Modal = ({ isOpen, onClose, images, initialIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen) return null;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

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
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
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

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          style={{
            position: "absolute",
            left: "10px",
            background: "rgba(255, 255, 255, 0.6)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
        >
          &#8249;
        </button>

        {/* Image Slider */}
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          style={{
            maxWidth: "80vw",
            maxHeight: "80vh",
            objectFit: "contain",
          }}
        />

        {/* Next Button */}
        <button
          onClick={handleNext}
          style={{
            position: "absolute",
            right: "10px",
            background: "rgba(255, 255, 255, 0.6)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Modal;
