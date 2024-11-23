import propTypes from "prop-types";
import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import toast from "react-hot-toast";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

CabinRow.propTypes = {
  cabin: propTypes.shape({
    id: propTypes.number.isRequired,
    image: propTypes.string,
    name: propTypes.string.isRequired,
    maxCapacity: propTypes.number.isRequired,
    regularPrice: propTypes.number.isRequired,
    discount: propTypes.number.isRequired,
    description: propTypes.string.isRequired,
  }).isRequired,
};

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
  } = cabin;

  function handleDuplicateCabin() {
    createCabin({
      name: `${name} (Copy)`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <Img src={image} alt='' />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabinId}></Menus.Toggle>

          <Menus.List id={cabinId}>
            <Menus.Item
              icon={<HiSquare2Stack />}
              onClick={handleDuplicateCabin}
              disabled={isCreating}
            >
              Duplicate
            </Menus.Item>

            <Modal.Open opens='edit-cabin'>
              <Menus.Item icon={<HiPencil />} disabled={isCreating}>
                Edit
              </Menus.Item>
            </Modal.Open>

            <Modal.Open opens='delete-cabin'>
              <Menus.Item icon={<HiTrash />} disabled={isDeleting}>
                Delete
              </Menus.Item>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Content name='edit-cabin'>
          <CreateCabinForm cabinToEdit={cabin} />
        </Modal.Content>

        <Modal.Content name='delete-cabin'>
          <ConfirmDelete
            resourceName={`Cabin ${name}`}
            onConfirm={() =>
              deleteCabin(cabinId, {
                onSettled: () =>
                  toast.success(`Cabin ${name} has been deleted successfully!`),
              })
            }
            disabled={isDeleting}
          />
        </Modal.Content>
      </Modal>
    </Table.Row>
  );
}

export default CabinRow;
