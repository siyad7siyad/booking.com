import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api_client";
import { useAppContext } from "../contexts/AppContext";

const VerifyOTP = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(apiClient.verifyOTP, {
    onSuccess: () => {
      showToast({ message: "OTP verified", type: "SUCCESS" });
      navigate("/reset-password"); // Redirect to the reset password page
    },
    onError: (error) => showToast({ message: error.message, type: "ERROR" }),
  });

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center mb-4">Verify OTP</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label className="text-gray-700 text-sm font-medium">
            OTP
            <input
              type="text"
              className="border rounded-lg w-full py-2 px-3 mt-1 text-gray-800"
              {...register("otp", { required: "OTP is required" })}
            />
            {errors.otp && (
              <span className="text-red-500 text-sm mt-1">
                {errors.otp.message}
              </span>
            )}
          </label>
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-purple-700 transition duration-300"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
