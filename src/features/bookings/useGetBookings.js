import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export function useGetBookings() {
  const queryCleint = useQueryClient();
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

  // Pagination
  const page = searchParams.get("page") ? +searchParams.get("page") : 1;

  const {
    data: { bookings, count } = {},
    isPending,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getBookings({ filter, sort, page }),
  });

  const totalPages = Math.ceil(count / PAGE_SIZE);

  // Prefetch the next page if there is one
  if (page < totalPages)
    queryCleint.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1 }),
    });

  // Prefetch the previous page if there is one
  if (page > 1)
    queryCleint.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1],
      queryFn: () => getBookings({ filter, sort, page: page - 1 }),
    });

  return { bookings, count, isPending, error };
}
