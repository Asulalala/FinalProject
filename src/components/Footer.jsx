import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer style={footerContainer}>
      <div style={footerContent}>
        {/* Logo / Name */}
        <div style={footerSection}>
          <h2 style={{ marginBottom: "10px" }}>ProductManagementApp</h2>
          <p style={{ color: "#ccc" }}>Your favorite products, all in one place.</p>
        </div>

        {/* Contact Info */}
        <div style={footerSection}>
          <h4 style={footerTitle}>Contact Us</h4>
          <p><FaEnvelope style={iconStyle} /> info@productapp.com</p>
          <p><FaPhone style={iconStyle} /> +63 912 345 6789</p>
          <p><FaMapMarkerAlt style={iconStyle} /> Rizal St., Sorsogon City</p>
        </div>

        {/* Social Links */}
        <div style={footerSection}>
          <h4 style={footerTitle}>Follow Us</h4>
          <div style={socialContainer}>
            <FaFacebook style={socialIcon} />
            <FaInstagram style={socialIcon} />
            <FaTwitter style={socialIcon} />
          </div>
        </div>
      </div>

      <div style={footerBottom}>
        &copy; {new Date().getFullYear()} ProductManagementApp. All rights reserved.
      </div>
    </footer>
  );
}

const footerContainer = {
  backgroundColor: "#222",
  color: "#fff",
  padding: "40px 20px 20px 20px",
  marginTop: "40px",
};

const footerContent = {
  display: "flex",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  gap: "40px",
  maxWidth: "1200px",
  margin: "0 auto", // center horizontally
};


const footerSection = {
  flex: "1 1 200px",
};

const footerTitle = {
  fontSize: "16px",
  marginBottom: "10px",
  fontWeight: "600",
};

const iconStyle = {
  marginRight: "8px",
  color: "#fff",
};

const socialContainer = {
  display: "flex",
  gap: "15px",
  fontSize: "20px",
};

const socialIcon = {
  cursor: "pointer",
  transition: "0.3s",
  color: "#fff",
};

const footerBottom = {
  textAlign: "center",
  paddingTop: "20px",
  borderTop: "1px solid #444",
  color: "#aaa",
  fontSize: "14px",
};
