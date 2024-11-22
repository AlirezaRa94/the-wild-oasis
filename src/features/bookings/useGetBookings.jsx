import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings";

export function useGetBookings() {
  const [searchParams] = useSearchParams();

  // Filter bookings based on the status query parameter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue == "all"
      ? null
      : { field: "status", value: filterValue };

  // Sort bookings based on the sortBy query parameter
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const [sortField, sortOrder] = sortBy.split("-");
  const sort = { field: sortField, order: sortOrder };

  const {
    data: bookings,
    isPending,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sort],
    queryFn: () => getBookings({ filter, sort }),
  });

  return { bookings, isPending, error };
}
