import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string |null>(null);
  const [loading, setLoading] = useState(false);

  const {session ,signUpNewUser } = UserAuth();

  const navigate = useNavigate();
 console.log("Current session:", session);
 console.log(email, password    );
  const handleSignUp = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signUpNewUser(email, password); // Call context function

      if (result.success) {
        navigate("/Dashboard"); // Navigate to dashboard on success
      } else {
        setError(result.error?.message || result.error);// Show error message on failure
      }
    } catch (err) {
      setError("An unexpected error occurred."); // Catch unexpected errors
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
 

   
    {/* Form */}
    <form onSubmit={handleSignUp} className="max-w-md m-auto pt-24">
       {/* Title */}
    <h2 className="text-3xl font-bold text-gray-800 text-center">
      Sign up today!
    </h2>

    {/* Subtitle */}
    <p className="text-center text-gray-500 mt-2">
      Already have an account?{" "}
      <Link
        to="/"
        className="text-indigo-600 font-semibold hover:underline"
      >
        Sign in
      </Link>
    </p>


      {/* Email */}
      <div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="w-80 mx-auto block px-4 py-3 border rounded-xl 
          border-gray-300 focus:outline-none focus:ring-2 
          focus:ring-indigo-500 mt-6"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />
      </div>

      {/* Password */}
      <div>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="w-80 bg-indigo-600 mx-auto block px-4 py-3 border rounded-xl 
          border-gray-300 focus:outline-none focus:ring-2 
          focus:ring-indigo-500 mt-6 p-4"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="mx-auto w-80 bg-indigo-600 text-white py-3 rounded-xl 
        font-semibold hover:bg-indigo-700 transition duration-300
        disabled:opacity-50"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      {/* Error */}
      {error && (
        <p className="text-red-600 text-center text-sm pt-2">
          {error}
        </p>
      )}
    </form>
  </div>

  );
};

export default Signup;