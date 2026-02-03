import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        width: "100%",
        textAlign: "center",
        padding: "1rem 0",
        backgroundColor: "#fad3d7", // soft pink
        color: "#d1898f",           // matching Dashboard accents
        borderTop: "2px solid #d1898f",
        borderRadius: "12px 12px 0 0",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
        marginTop: "auto",
        fontWeight: "bold",
        fontSize: "0.9rem",
      }}
    >
      © 2026 ERICA CADSAWAN ● JOANNE COSTO ● ANGEL MONTANO | All Good Vibes Reserved
    </footer>
  );
};

export default Footer;
