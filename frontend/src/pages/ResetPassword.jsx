import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api_client";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const ResetPassword = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const { token } = useParams(); // Get the token from the URL

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(apiClient.resetPassword, {
    onSuccess: () => {
      showToast({ message: "Password successfully reset", type: "SUCCESS" });
      navigate("/sign-in"); // Redirect to sign-in page after successful password reset
    },
    onError: (error) => showToast({ message: error.message, type: "ERROR" }),
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate({ ...data, token }); // Include the token with the password reset request
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center mb-4">Reset Password</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label className="text-gray-700 text-sm font-medium">
            New Password
            <input
              type="password"
              className="border rounded-lg w-full py-2 px-3 mt-1 text-gray-800"
              {...register("password", {
                required: "Password is required",
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
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-purple-700 transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
