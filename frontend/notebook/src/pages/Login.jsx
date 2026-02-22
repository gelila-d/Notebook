import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure withCredentials is true so the cookie is saved in the browser
      const { data } = await axios.post(
        "http://localhost:5002/login",
        { email, password },
        { withCredentials: true }
      );

      // Backend sends { success: true } on login; verify either field
      if (data.success || data.status) {
        navigate("/");
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error("Login error", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div data-theme="cupcake" className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl border border-primary/20">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-primary flex justify-center mb-4">
            Welcome Back!
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="hello@example.com"
                className="input input-bordered input-primary w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control w-full mt-4">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered input-primary w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label">
                <span className="label-text-alt link link-hover text-secondary">Forgot password?</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="card-actions justify-center mt-6">
              <button type="submit" className="btn btn-accent w-full text-white">
                Login
              </button>
            </div>
          </form>

          <div className="divider text-xs text-base-content/50">OR</div>

          <p className="text-center text-sm">
            New here?{" "}
            <span
              className="text-secondary font-bold cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;