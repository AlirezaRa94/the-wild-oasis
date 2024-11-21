import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens='create-cabin-form'>
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Content name='create-cabin-form'>
          <CreateCabinForm />
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default AddCabin;
