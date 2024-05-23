"use client";

import { PiPlus } from "react-icons/pi";
import { Button } from "@mui/material";
import { useState } from "react";
import Modal from "@/components/Layout/Modal/Modal";
import { FormProvider, useForm } from "react-hook-form";
import InputText from "@/components/Form/InputText";
import ModalButtons from "@/components/Layout/Modal/ModalButtons";
import { buildRequest } from "@/utils/websocket";
import { command } from "@/consts/Websockets/command";
import { useSnackbar } from "notistack";
import { errorVariant, successVariant } from "@/consts/snackbarVariants";
import { errorOccurred } from "@/utils/consoleErrors";
import { isJsonParsable } from "@/utils/json";
import { response } from "@/consts/Websockets/response";

export default function LinkModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const methods = useForm();
  const { handleSubmit } = methods;
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (formData: any) => {
    setLoading(true);

    const socket = new WebSocket(`ws://${formData.address}`);
    socket.addEventListener("open", () => {
      socket.send(buildRequest(command.INIT));
    });

    socket.addEventListener("message", (event) => {
      let responseData = event.data;
      if (!isJsonParsable(responseData)) {
        enqueueSnackbar("Failed to connect to the server", errorVariant);
        return;
      }

      responseData = JSON.parse(responseData);
      const { data, message } = responseData;

      if (message !== response.OK) {
        enqueueSnackbar("Failed to connect to the server", errorVariant);
        return;
      }

      fetch("/api/instance", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          psk: data,
        }),
      }).then((res) => {
        if (!res.ok) {
          enqueueSnackbar("Failed to connect to the server", errorVariant);
          return;
        }

        enqueueSnackbar("Server linked successfully", successVariant);
        setOpen(false);
        setLoading(false);
      });
    });

    socket.addEventListener("error", (event) => {
      setLoading(false);
      enqueueSnackbar("Failed to connect to the server", errorVariant);
      console.error(errorOccurred, event);
    });
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<PiPlus />}
        onClick={() => setOpen(true)}
      >
        Link new instance
      </Button>
      <Modal open={open} handleClose={() => setOpen(false)}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputText name="name" label="Server Name" required />
            <InputText
              sx={{ mt: 2 }}
              name="address"
              label="IP Address"
              required
            />
            <ModalButtons
              handleClose={() => setOpen(false)}
              loading={loading}
            />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}
