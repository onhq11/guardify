"use client";

import { PiPlus } from "react-icons/pi";
import { Button } from "@mui/material";
import { useState } from "react";
import Modal from "@/components/Layout/Modal/Modal";
import { FormProvider, useForm } from "react-hook-form";
import InputText from "@/components/Form/InputText";
import ModalButtons from "@/components/Layout/Modal/ModalButtons";

export default function LinkModal() {
  const [open, setOpen] = useState(false);
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (formData: any) => {
    console.log(formData);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<PiPlus />}
        sx={{ textTransform: "capitalize" }}
        onClick={() => setOpen(true)}
      >
        Link new instance
      </Button>
      <Modal open={open} handleClose={() => setOpen(false)}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputText name="address" label="IP Address" required />
            <ModalButtons handleClose={() => setOpen(false)} />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}
