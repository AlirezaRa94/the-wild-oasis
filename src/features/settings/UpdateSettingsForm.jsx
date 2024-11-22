import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useGetSettings } from "./useGetSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isPending,
  } = useGetSettings();
  const { updateSettings, isUpdating } = useUpdateSettings();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    },
    disabled: isUpdating,
  });

  function onSubmit(data) {
    updateSettings(data);
  }

  if (isPending) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label='Minimum nights/booking'
        error={errors?.minBookingLength?.message}
      >
        <Input
          type='number'
          id='minBookingLength'
          disabled={isUpdating}
          {...register("minBookingLength", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum value is 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Maximum nights/booking'
        error={errors?.maxBookingLength?.message}
      >
        <Input
          type='number'
          id='maxBookingLength'
          disabled={isUpdating}
          {...register("maxBookingLength", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum value is 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Maximum guests/booking'
        error={errors?.maxGuestsPerBooking?.message}
      >
        <Input
          type='number'
          id='maxGuestsPerBooking'
          disabled={isUpdating}
          {...register("maxGuestsPerBooking", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum value is 1",
            },
          })}
        />
      </FormRow>

      <FormRow label='Breakfast price' error={errors?.breakfastPrice?.message}>
        <Input
          type='number'
          id='breakfastPrice'
          disabled={isUpdating}
          {...register("breakfastPrice", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Minimum value is 0",
            },
          })}
        />
      </FormRow>

      <FormRow>
        <Button $variation='secondary' onClick={() => reset()} type='button'>
          Reset
        </Button>
        <Button disabled={isUpdating} type='submit'>
          Update Settings
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
