import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBooking } from "../../services/apiBookings";

export function useCheckOut() {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked out successfully`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { checkOut, isCheckingOut };
}
