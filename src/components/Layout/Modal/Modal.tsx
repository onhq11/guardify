import {
  Breakpoint,
  Button,
  Dialog,
  DialogContent,
  DialogContentProps,
} from "@mui/material";
import { ReactNode } from "react";
import { SxProps } from "@mui/system";

interface Props {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
  size?: Breakpoint;
}

export default function Modal({
  open,
  handleClose,
  children,
  size = "sm",
  ...props
}: Props & Partial<DialogContentProps>) {
  return (
    <Dialog
      open={open}
      maxWidth={size}
      fullWidth
      onClose={handleClose}
      sx={{ zIndex: 1300 }}
    >
      <DialogContent sx={{ p: 3.5 }} {...props}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
