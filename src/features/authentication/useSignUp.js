import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { signUp as signUpAPI } from "../../services/apiAuth";

export function useSignUp() {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: signUpAPI,
    onSuccess: () => {
      toast.success(
        "User created successfully. Please verify the user's email."
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signUp, isPending };
}
