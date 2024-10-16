import React from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa6";

const FloatingIcons = () => {
  return (
    <div style={styles.container}>
      <a
        href="https://wa.me/yourwhatsappnumber"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.icon}
      >
        <FaWhatsapp style={styles.whatsappIcon}/>
      </a>
      <a href="tel:yourphonenumber" style={styles.icon}>
        <FaPhone style={styles.phoneIcon}/>
      </a>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    zIndex: 1000,
  },
  icon: {
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#25D366", // WhatsApp green color
    borderRadius: "50%",
    padding: "15px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s",
  },
  whatsappIcon: {
    fontSize: "24px",
  },
  phoneIcon: {
    fontSize: "24px",
    backgroundColor: "#34b7f1", // Phone icon blue color
  },
};

export default FloatingIcons;
