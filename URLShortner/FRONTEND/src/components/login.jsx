import React, { useState } from "react";
import { loginUser } from "../apis/user.api.js";
import { useRouter } from '@tanstack/react-router';
import { useAuth } from "../context/authContext";


const Login = ({setIsLogin}) => {
  const { fetchUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();


  try {
    const data = await loginUser(email, password);
    console.log("Login successful:", data);

    setEmail("");
    setPassword("");
    await fetchUser();
    router.navigate({ to: "/" });
  } catch (error) {
    console.error("Login failed:", error);
    alert(error?.response?.data?.message || "Login failed. Please try again.");
  }
};


  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-4 bg-white rounded-lg  ">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="#"
            onClick={() => setIsLogin(false)}
            className="text-blue-500 hover:underline"> sign up  </a>

        </p>
      </div>
    </div>
  );
};

export default Login;
