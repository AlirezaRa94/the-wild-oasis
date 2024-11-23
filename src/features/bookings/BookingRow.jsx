import styled from "styled-components";
import propTypes from "prop-types";
import { format, isToday } from "date-fns";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye } from "react-icons/hi2";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { useCheckOut } from "../check-in-out/useCheckOut";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

BookingRow.propTypes = {
  booking: propTypes.shape({
    id: propTypes.number,
    created_at: propTypes.string,
    startDate: propTypes.string,
    endDate: propTypes.string,
    numNights: propTypes.number,
    numGuests: propTypes.number,
    totalPrice: propTypes.number,
    status: propTypes.string,
    guests: propTypes.shape({
      fullName: propTypes.string,
      email: propTypes.string,
    }),
    cabins: propTypes.shape({
      name: propTypes.string,
    }),
  }),
};

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  const { checkOut, isCheckingOut } = useCheckOut();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Menus.Menu>
        <Menus.Toggle id={bookingId} />

        <Menus.List id={bookingId}>
          <Menus.Item
            icon={<HiEye />}
            onClick={() => navigate(`/bookings/${bookingId}`)}
          >
            See Details
          </Menus.Item>

          {status === "unconfirmed" && (
            <Menus.Item
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${bookingId}`)}
            >
              Check In
            </Menus.Item>
          )}

          {status === "checked-in" && (
            <Menus.Item
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkOut(bookingId)}
              disabled={isCheckingOut}
            >
              Check Out
            </Menus.Item>
          )}
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
