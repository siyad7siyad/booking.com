import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api_client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

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
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Create an Account
          </h2>
          <div className="flex flex-col md:flex-row gap-5">
            <label className="text-gray-700 text-sm font-semibold flex-1">
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
            </label>
            <label className="text-gray-700 text-sm font-semibold flex-1">
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
            </label>
          </div>
          <label className="text-gray-700 text-sm font-semibold">
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
          </label>
          <label className="text-gray-700 text-sm font-semibold">
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
          </label>
          <label className="text-gray-700 text-sm font-semibold">
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
          </label>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-full font-bold text-xl hover:bg-blue-700 transition duration-300 mt-6"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
