import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { updateBooking } from "../../services/apiBookings";

export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isPending: isCheckingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-in", isPaid: true }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked in successfully`);
      // Invalidate the active bookings query to refetch the updated data
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { checkIn, isCheckingIn };
}
