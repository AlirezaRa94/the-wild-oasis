import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login as loginAPI } from "../../services/apiAuth";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: (credentials) => loginAPI(credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success(`Welcome back, ${user.user.email}!`);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isPending };
}
