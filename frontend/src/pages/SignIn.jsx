import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api_client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const mutation = useMutation(apiClient.SignIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      <motion.div
        className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full transform transition-all duration-500 hover:scale-105"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-5xl font-extrabold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Please sign in to your account
        </p>
        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
          <motion.label
            className="text-gray-700 text-sm font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Email
            <input
              type="email"
              className="border rounded-lg w-full py-3 px-4 mt-2 text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </motion.label>
          <motion.label
            className="text-gray-700 text-sm font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Password
            <input
              type="password"
              className="border rounded-lg w-full py-3 px-4 mt-2 text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </span>
            )}
          </motion.label>
          <motion.button
            type="submit"
            className="bg-purple-600 text-white py-3 px-4 rounded-full font-semibold text-xl hover:bg-purple-700 transition duration-300 mt-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Sign In
          </motion.button>
          <span className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link className="text-purple-600 hover:underline" to="/register">
              Sign Up
            </Link>
          </span>
        </form>
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/reset-password-request"
            className="text-gray-500 hover:text-purple-600 transition duration-300"
          >
            Forgot your password?
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignIn;
