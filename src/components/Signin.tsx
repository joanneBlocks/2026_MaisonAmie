import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Header from "../components/Header"; // Import Header

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
    <>
      {/* Header without Sign Out */}
      <Header showSignOut={false} />

      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: "#fad3d7" }}
      >
        <div
          className="w-full max-w-md rounded-3xl shadow-xl p-10"
          style={{ backgroundColor: "#ffffff", border: "2px solid #d1898f" }}
        >
          <h2
            className="text-3xl font-extrabold text-center"
            style={{ color: "#d1898f" }}
          >
            Welcome Back
          </h2>

          <p className="text-center mt-2 text-sm" style={{ color: "#000000" }}>
            Sign in to continue
          </p>

          <form onSubmit={handleSignIn} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#000000" }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
                style={{ border: "1px solid #d1898f" }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#000000" }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
                style={{ border: "1px solid #d1898f" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
              style={{ backgroundColor: "#d1898f", color: "#ffffff" }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {error && (
              <p className="text-center text-sm text-red-600">{error}</p>
            )}

            <p className="text-center text-sm mt-2" style={{ color: "#000000" }}>
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold hover:underline"
                style={{ color: "#d1898f" }}
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
