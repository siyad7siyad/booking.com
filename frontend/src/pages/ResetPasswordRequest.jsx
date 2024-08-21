import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api_client";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const ResetPasswordRequest = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(apiClient.resetPasswordRequest, {
    onSuccess: () => {
      showToast({ message: "Reset password email sent", type: "SUCCESS" });
      navigate("/check-email"); // Redirect to a page informing the user to check their email
    },
    onError: (error) => showToast({ message: error.message, type: "ERROR" }),
  });

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center mb-4">Forgot Password</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label className="text-gray-700 text-sm font-medium">
            Email
            <input
              type="email"
              className="border rounded-lg w-full py-2 px-3 mt-1 text-gray-800"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </label>
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-purple-700 transition duration-300"
          >
            Request Password Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordRequest;
