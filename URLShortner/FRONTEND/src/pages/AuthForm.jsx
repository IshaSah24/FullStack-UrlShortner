import React, { useState } from "react";
import Login from "../components/login";
import Register from "../components/register";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex shadow-xl items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-indigo-600">
              URL Shortener
            </h1>
          </div>

          {isLogin ? (
            <Login setIsLogin={setIsLogin} />
          ) : (
            <Register setIsLogin={setIsLogin} />
          )}
        </div>
      </div>
    </>
  );
};

export default AuthForm;
