import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import Header from "../components/Header";

const Dashboard = () => {
  const { session } = UserAuth();
  const [error, setError] = useState<string | null>(null);

  // Show an error if the user is not logged in
  useEffect(() => {
    if (!session) {
      setError("You are not logged in. Please log in to access your dashboard.");
    } else {
      setError(null); // clear error if session exists
    }
  }, [session]);

  return (
    <>
      <Header />

      <div
        className="min-h-screen px-6 py-10"
        style={{ backgroundColor: "#fad3d7" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Profile Sidebar */}
          <div
            className="rounded-3xl shadow-lg p-8 text-center"
            style={{
              backgroundColor: "#ffffff",
              border: "2px solid #d1898f",
            }}
          >
            <div
              className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl"
              style={{
                backgroundColor: "#fad3d7",
                color: "#d1898f",
              }}
            >
              👩🏻
            </div>

            <h2 className="mt-4 font-bold text-lg text-black">
              {session?.user?.email || "Guest"}
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Welcome to your personal space
            </p>

            <div className="flex justify-around mt-6">
              <div>
                <p className="font-bold" style={{ color: "#d1898f" }}>28</p>
                <p className="text-xs text-gray-500">Posts</p>
              </div>

              <div>
                <p className="font-bold" style={{ color: "#d1898f" }}>1.2k</p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>

              <div>
                <p className="font-bold" style={{ color: "#d1898f" }}>560</p>
                <p className="text-xs text-gray-500">Following</p>
              </div>
            </div>

            <button
              className="mt-6 w-full py-2 rounded-xl font-semibold shadow-md"
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
              <h3 className="font-bold text-black">Daily Self-Care 🌸</h3>
              <p className="text-xs text-gray-500">3 hours ago</p>

              <p className="mt-4 text-sm text-gray-700">
                Reminder: You deserve softness, love, and peace today 💖  
                Take a deep breath and choose yourself.
              </p>

              <div className="flex gap-4 mt-5">
                <button
                  style={{
                    backgroundColor: "#fad3d7",
                    color: "#d1898f",
                    padding: "8px 16px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Like
                </button>

                <button
                  style={{
                    backgroundColor: "#fad3d7",
                    color: "#d1898f",
                    padding: "8px 16px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Comment
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
              <h3 className="font-bold text-black">Women Empowerment ✨</h3>
              <p className="text-xs text-gray-500">Yesterday</p>

              <p className="mt-4 text-sm text-gray-700">
                Strong women don’t compete — they uplift 💗  
                Your glow is your power.
              </p>

              <div className="flex gap-4 mt-5">
                <button
                  style={{
                    backgroundColor: "#fad3d7",
                    color: "#d1898f",
                    padding: "8px 16px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Like
                </button>

                <button
                  style={{
                    backgroundColor: "#fad3d7",
                    color: "#d1898f",
                    padding: "8px 16px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Share
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-center text-red-600 text-sm">{error}</p>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
