import propTypes from "prop-types";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

import Stat from "./Stat";

import { formatCurrency } from "../../utils/helpers";

Stats.propTypes = {
  bookings: propTypes.array.isRequired,
  confirmedStays: propTypes.array.isRequired,
  numDays: propTypes.number.isRequired,
  cabinsCount: propTypes.number.isRequired,
};

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
  // 1.
  const numberOfBookings = bookings.length;
  // 2.
  const sales = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  // 3.
  const totalCheckIns = confirmedStays.length;
  // 4.
  const totalOccupiedNights = confirmedStays.reduce(
    (sum, stay) => sum + stay.numNights,
    0
  );
  const totalAvailableNights = cabinsCount * numDays;
  const occupancyRate = Math.round(
    (totalOccupiedNights / totalAvailableNights) * 100
  );

  return (
    <>
      <Stat
        title='Bookings'
        value={numberOfBookings}
        color='blue'
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title='Sales'
        value={formatCurrency(sales)}
        color='green'
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title='Check-ins'
        value={totalCheckIns}
        color='indigo'
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title='Occupancy Rate'
        value={`${occupancyRate}%`}
        color='yellow'
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
