import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

interface HeaderProps {
  showSignOut?: boolean;
}

const Header = ({ showSignOut = true }: HeaderProps) => {
  const { signOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  return (
    <header
      style={{
        backgroundColor: "#d1898f",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        <img
          src="/MaisonAmieLogoWhite.png"
          alt="Maison Amie"
          width="90px"
        />
      </h1>

      {showSignOut && (
        <nav style={{ display: "flex", gap: "20px" }}>
          <button
            onClick={handleSignOut}
            style={{
              backgroundColor: "#fad3d7",
              color: "#d1898f",
              padding: "8px 16px",
              borderRadius: "12px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
