"use client";
import { useState } from "react";
import { forgotPassword } from "@/utils";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const responseData = await forgotPassword({ email });
      setMessage(responseData.message);
    } catch (err) {
      setError(err.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Forgot Your Password?</h2>
        <p className="mb-4 text-gray-700">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Your Email Address"
            className="border p-2 rounded text-gray-700"
            value={email}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className={`bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${
              loading ? "cursor-wait" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Sending Link..." : "Send Reset Link"}
          </button>
          {message && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
