"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { resetPassword } from "@/utils";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link.");
    }
  }, [token]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const responseData = await resetPassword(token, { password });
      setMessage(responseData.message + ". Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Reset Your Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="New Password"
            className="border p-2 rounded text-gray-700"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="border p-2 rounded text-gray-700"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <button
            type="submit"
            className={`bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${
              loading ? "cursor-wait" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>
          {message && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
