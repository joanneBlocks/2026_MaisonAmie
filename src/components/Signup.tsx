import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Header from "../components/Header";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signUpNewUser(email, password);

      if (result.success) {
        navigate("/Dashboard");
      } else {
        setError(result.error?.message || result.error);
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <Header showSignOut={false} />


      {/* Page Background */}
      <div
        className="min-h-screen flex items-start justify-center px-4 pt-24"
        style={{ backgroundColor: "#fad3d7" }}
      >
        {/* Card */}
        <div
          className="w-full max-w-md rounded-3xl shadow-xl p-10"
          style={{
            backgroundColor: "#ffffff",
            border: "2px solid #d1898f",
          }}
        >
          {/* Title */}
          <h2
            className="text-3xl font-extrabold text-center"
            style={{ color: "#d1898f" }}
          >
            Elevate Your World
          </h2>

          {/* Subtitle */}
          <p
            className="text-center mt-2 text-sm"
            style={{ color: "#000000" }}
          >
            Already have an account?{" "}
            <Link
              to="/"
              className="font-semibold hover:underline"
              style={{ color: "#d1898f" }}
            >
              Sign in
            </Link>
          </p>

          {/* Form */}
          <form onSubmit={handleSignUp} className="mt-8 space-y-6">
            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#000000" }}
              >
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
                style={{ border: "1px solid #d1898f" }}
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
                type="password"
                placeholder="Create a password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
                style={{ border: "1px solid #d1898f" }}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold shadow-lg transition duration-300 disabled:opacity-50"
              style={{
                backgroundColor: "#d1898f",
                color: "#ffffff",
              }}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            {/* Error */}
            {error && (
              <p className="text-red-600 text-center text-sm">{error}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
