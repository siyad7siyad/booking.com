import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api_client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Register() {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <motion.div
        className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Create an Account
          </motion.h2>
          <div className="flex flex-col md:flex-row gap-5">
            <motion.label
              className="text-gray-700 text-sm font-semibold flex-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              First Name
              <input
                className="border rounded-full w-full py-2 px-4 mt-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
                {...register("firstName", {
                  required: "This field is required",
                })}
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </span>
              )}
            </motion.label>
            <motion.label
              className="text-gray-700 text-sm font-semibold flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Last Name
              <input
                className="border rounded-full w-full py-2 px-4 mt-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
                {...register("lastName", {
                  required: "This field is required",
                })}
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </span>
              )}
            </motion.label>
          </div>
          <motion.label
            className="text-gray-700 text-sm font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Email
            <input
              type="email"
              className="border rounded-full w-full py-2 px-4 mt-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </motion.label>
          <motion.label
            className="text-gray-700 text-sm font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Password
            <input
              type="password"
              className="border rounded-full w-full py-2 px-4 mt-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
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
          <motion.label
            className="text-gray-700 text-sm font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Confirm Password
            <input
              type="password"
              className="border rounded-full w-full py-2 px-4 mt-2 text-gray-800 focus:ring-2 focus:ring-blue-500"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "This field is required";
                  } else if (watch("password") !== val) {
                    return "Passwords do not match";
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </span>
            )}
          </motion.label>
          <motion.button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-full font-bold text-xl hover:bg-blue-700 transition duration-300 mt-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Create Account
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Register;
