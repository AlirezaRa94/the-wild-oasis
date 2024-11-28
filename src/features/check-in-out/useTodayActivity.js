import { useQuery } from "@tanstack/react-query";

import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const {
    data: activities,
    isPending,
    error,
  } = useQuery({
    queryKey: ["todayActivity"],
    queryFn: getStaysTodayActivity,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return { activities, isPending };
}
