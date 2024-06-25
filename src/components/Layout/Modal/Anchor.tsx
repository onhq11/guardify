import { ReactNode, useState } from "react";
import { Button } from "@mui/material";

interface Props {
  modal: (props: { open: boolean; handleClose: () => void }) => ReactNode;
  body?: (props: { open: boolean; handleOpen: () => void }) => ReactNode;
}

export default function Anchor({ modal, body }: Props) {
  const [open, setOpen] = useState(false);

  const defaultAnchor = <Button>Open</Button>;

  return (
    <>
      {body ? body({ open, handleOpen: () => setOpen(true) }) : defaultAnchor}
      {modal({ open, handleClose: () => setOpen(false) })}
    </>
  );
}
