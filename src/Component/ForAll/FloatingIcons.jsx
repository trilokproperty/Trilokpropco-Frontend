import React, { useEffect, useState } from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa6";
import { endPoint } from "./ForAll";

const FloatingIcons = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(`${endPoint}/footer`);
        const data = await response.json();
        setFooterData(data[0]);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <div style={styles.container}>
      <a
       // href={`https://wa.me/${footerData?.contact}`}
      href="https://api.whatsapp.com/send/?phone=919831775758&text&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.icon}
      >
        <FaWhatsapp style={styles.whatsappIcon} />
      </a>
      <a href={`tel:${footerData?.contact}`} style={styles.icon}>
        <FaPhone style={styles.phoneIcon} />
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
    cursor: "pointer",
    // Add hover effect
    ':hover': {
      transform: 'scale(1.1)',
    },
  },
  whatsappIcon: {
    fontSize: "24px",
  },
  phoneIcon: {
    fontSize: "24px",
  },
  // Media query for responsiveness
  '@media(max-width: 768px)': {
    container: {
      bottom: "10px",
      right: "10px",
      gap: "10px",
    },
    icon: {
      padding: "10px",
    },
    whatsappIcon: {
      fontSize: "20px",
    },
    phoneIcon: {
      fontSize: "20px",
    },
  },
  '@media(max-width: 480px)': {
    container: {
      bottom: "8px",
      right: "8px",
    },
    icon: {
      padding: "5px",
    },
    whatsappIcon: {
      fontSize: "15px",
    },
    phoneIcon: {
      fontSize: "15px",
    },
  },
};

export default FloatingIcons;
