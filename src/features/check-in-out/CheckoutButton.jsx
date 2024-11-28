import propTypes from "prop-types";

import Button from "../../ui/Button";

import { useCheckOut } from "./useCheckOut";

CheckoutButton.propTypes = {
  bookingId: propTypes.number.isRequired,
};

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckOut();

  return (
    <Button
      $variation='primary'
      $size='small'
      disabled={isCheckingOut}
      onClick={() => checkOut(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
