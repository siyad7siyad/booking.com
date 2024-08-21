import React from "react";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api_client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");

      showToast({ message: "Signed Out!", type: "SUCCESS" });
      navigate("/sign-in");
    },
    onError: (error) => {
      showToast({ message: error, message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="text-white bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2 rounded-full font-bold shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-blue-500 transition-transform transform hover:scale-105 duration-300"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOutButton;
