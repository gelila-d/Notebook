import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Signup = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5002/signup",
        { ...inputValue },
        { withCredentials: true }
      );

      if (data.success) {
        navigate("/");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div data-theme="cupcake" className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-primary/20">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-primary flex justify-center mb-2">
            Create Account
          </h2>
          <p className="text-center text-sm mb-4 text-base-content/70">Join us today!</p>

          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Username</span>
              </label>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Type here"
                className="input input-bordered input-primary w-full"
                onChange={handleOnChange}
                required
              />
            </div>

            {/* Email Field */}
            <div className="form-control w-full mt-4">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="email@example.com"
                className="input input-bordered input-primary w-full"
                onChange={handleOnChange}
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
                name="password"
                value={password}
                placeholder="••••••••"
                className="input input-bordered input-primary w-full"
                onChange={handleOnChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="card-actions justify-center mt-8">
              <button type="submit" className="btn btn-accent w-full text-white">
                Sign Up
              </button>
            </div>
          </form>

          <div className="divider text-xs text-base-content/50 uppercase tracking-widest">Already a member?</div>

          <div className="text-center">
            <button
              className="btn btn-outline btn-secondary btn-sm"
              onClick={() => navigate("/login")}
            >
              Log In Instead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;