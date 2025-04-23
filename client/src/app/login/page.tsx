"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, decodeToken } from "@/utils";
import loginImage from "../../../public/loginImage.jpg";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await login(formData);
      localStorage.setItem("token", token);
      const decodedToken = decodeToken(token);
      if (!decodedToken) {
        setError("Invalid token");
        return;
      }
      const { role } = decodedToken;
      if (role === "ADMIN") {
        router.push("/category");
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("Something is wrong");
    }
  };
  return (
    <div className="flex gap-[48px]">
      <div className="w-1/3 ml-[100px] mt-[326px] flex flex-col gap-6">
        <h1 className="font-bold text-2xl">Log in</h1>
        <p>Log in to enjoy your favorite dishes.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className="border-2"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-2"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <p className="underline">Forgot password?</p>
          <button
            type="submit"
            className="w-full border-2 bg-[#18181B] text-white py-2 rounded-2xl"
          >
            Let's go
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        <p className="text-center">
          Don't have account?{" "}
          <span
            className="text-blue-400"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
      <div className="px-5 py-5 w-2/3">
        <img src={loginImage.src} className="w-full h-full" alt="LoginImage" />
      </div>
    </div>
  );
};
export default Login;
