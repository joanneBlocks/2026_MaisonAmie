import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signInUser(email, password);

      if (result.success) {
        navigate("/Dashboard");
      } else {
        setError(result.error || "Sign-in failed");
      }
    } catch {
      setError("Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#fad3d7" }} // Light Pink Background
    >
      {/* Card */}
      <div
        className="w-full max-w-md rounded-3xl shadow-xl p-10"
        style={{
          backgroundColor: "#ffffff", // White Card
          border: "2px solid #d1898f", // Dark Pink Border
        }}
      >
        {/* Title */}
        <h2
          className="text-3xl font-extrabold text-center"
          style={{ color: "#d1898f" }} // Dark Pink Title
        >
          Welcome Back 💖
        </h2>

        {/* Subtitle */}
        <p
          className="text-center mt-2 text-sm"
          style={{ color: "#000000" }} // Black Text
        >
          Sign in to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSignIn} className="mt-8 space-y-6">
          {/* Email */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#000000" }}
            >
              Email Address
            </label>

            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
              style={{
                border: "1px solid #d1898f",
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#000000" }}
            >
              Password
            </label>

            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
              style={{
                border: "1px solid #d1898f",
              }}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
            style={{
              backgroundColor: "#d1898f", // Dark Pink Button
              color: "#ffffff", // White Text
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Error */}
          {error && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          {/* Footer */}
          <p
            className="text-center text-sm mt-2"
            style={{ color: "#000000" }}
          >
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold hover:underline"
              style={{ color: "#d1898f" }} // Dark Pink Link
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
