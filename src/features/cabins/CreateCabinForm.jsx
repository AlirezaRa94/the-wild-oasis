import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import propTypes from "prop-types";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { updateCabin } from "../../services/apiCabins";
import { useCreateCabin } from "./useCreateCabin";

CreateCabinForm.propTypes = {
  cabinToEdit: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    maxCapacity: propTypes.number,
    regularPrice: propTypes.number,
    discount: propTypes.number,
    description: propTypes.string,
    image: propTypes.string,
  }),
};

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const queryClient = useQueryClient();
  const { createCabin, isCreating } = useCreateCabin();

  // Mutation function for editing an existing cabin
  const { mutate: mutateUpdateCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => updateCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin edited successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const { errors } = formState;
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      mutateUpdateCabin({ newCabinData: { ...data, image }, id: editId });
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Cabin Name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label='Maximum Capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity must be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular Price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 50,
              message: "Price must be at least 50",
            },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              +value <= +getValues("regularPrice") ||
              "Discount must be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow
        label='Description for Website'
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          disabled={isWorking}
          defaultValue=''
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label='Cabin Photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          accept='image/*'
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
