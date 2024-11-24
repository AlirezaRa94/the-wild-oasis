import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { logout as logoutAPI } from "../../services/apiAuth";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      toast.success("You have been logged out successfully!");
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { logout, isPending };
}
