import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  // ✅ Proper error state
  const [error, setError] = useState<string | null>(null);

  // ✅ Correct event type
  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setError(null);

    try {
      await signOut();
      navigate("/");
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Welcome to Maisonamie, {session?.user?.email}</h2>

      {/* ✅ Show error if exists */}
      {error && <p className="text-red-600">{error}</p>}

      <button
        onClick={handleSignOut}
        className="hover:cursor-pointer border inline-block px-4 py-3 mt-4"
      >
        Sign out
      </button>
    </div>
  );
};

export default Dashboard;
