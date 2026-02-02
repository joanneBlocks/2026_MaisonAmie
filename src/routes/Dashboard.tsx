import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch {
      setError("Something went wrong.");
    }
  };

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{ backgroundColor: "#fad3d7" }} // Light Pink BG
    >
      {/* Top Navigation */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <h1
          className="text-3xl font-extrabold tracking-wide"
          style={{ color: "#d1898f" }}
        >
          MaisonAmie ✨
        </h1>

        <button
          onClick={handleSignOut}
          className="px-6 py-2 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
          style={{
            backgroundColor: "#d1898f",
            color: "#ffffff",
          }}
        >
          Sign Out
        </button>
      </div>

      {/* Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div
          className="rounded-3xl shadow-lg p-8 text-center"
          style={{
            backgroundColor: "#ffffff",
            border: "2px solid #d1898f",
          }}
        >
          {/* Avatar */}
          <div
            className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl"
            style={{
              backgroundColor: "#fad3d7",
              color: "#d1898f",
            }}
          >
            👩🏻
          </div>

          <h2
            className="mt-4 font-bold text-lg"
            style={{ color: "#000000" }}
          >
            {session?.user?.email}
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Welcome to your personal space 💖
          </p>

          {/* Social Stats */}
          <div className="flex justify-around mt-6">
            <div>
              <p className="font-bold" style={{ color: "#d1898f" }}>
                28
              </p>
              <p className="text-xs text-gray-500">Posts</p>
            </div>

            <div>
              <p className="font-bold" style={{ color: "#d1898f" }}>
                1.2k
              </p>
              <p className="text-xs text-gray-500">Followers</p>
            </div>

            <div>
              <p className="font-bold" style={{ color: "#d1898f" }}>
                560
              </p>
              <p className="text-xs text-gray-500">Following</p>
            </div>
          </div>

          {/* Edit Profile */}
          <button
            className="mt-6 w-full py-2 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
            style={{
              backgroundColor: "#fad3d7",
              color: "#d1898f",
              border: "1px solid #d1898f",
            }}
          >
            Edit Profile
          </button>
        </div>

        {/* Feed Section */}
        <div className="md:col-span-2 space-y-6">
          {/* Post 1 */}
          <div
            className="rounded-3xl shadow-lg p-6"
            style={{
              backgroundColor: "#ffffff",
              border: "2px solid #d1898f",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "#fad3d7",
                  color: "#d1898f",
                }}
              >
                🌸
              </div>

              <div>
                <h3 className="font-bold text-sm text-black">
                  Daily Self-Care
                </h3>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-700">
              Reminder: You deserve softness, love, and peace today 💖  
              Take a deep breath and choose yourself.
            </p>

            <div className="flex gap-4 mt-5">
              <button
                className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{
                  backgroundColor: "#fad3d7",
                  color: "#d1898f",
                }}
              >
                ❤️ Like
              </button>

              <button
                className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{
                  backgroundColor: "#fad3d7",
                  color: "#d1898f",
                }}
              >
                💬 Comment
              </button>
            </div>
          </div>

          {/* Post 2 */}
          <div
            className="rounded-3xl shadow-lg p-6"
            style={{
              backgroundColor: "#ffffff",
              border: "2px solid #d1898f",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "#fad3d7",
                  color: "#d1898f",
                }}
              >
                ✨
              </div>

              <div>
                <h3 className="font-bold text-sm text-black">
                  Women Empowerment
                </h3>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-700">
              Strong women don’t compete — they uplift 💗  
              Your glow is your power.
            </p>

            <div className="flex gap-4 mt-5">
              <button
                className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{
                  backgroundColor: "#fad3d7",
                  color: "#d1898f",
                }}
              >
                ❤️ Like
              </button>

              <button
                className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{
                  backgroundColor: "#fad3d7",
                  color: "#d1898f",
                }}
              >
                🔁 Share
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-center text-red-600 text-sm">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
