import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";

import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useGetCabins } from "../cabins/useGetCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {
    bookings,
    isPending: isLoadingBookings,
    numDays,
  } = useRecentBookings();
  const { stays, confirmedStays, isPending: isLoadingStays } = useRecentStays();
  const { cabins, isPending: isLoadingCabins } = useGetCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinsCount={cabins.length}
      />
      <div>Today Activities</div>
      <div>Chart stay durations</div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
