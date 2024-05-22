import { Breakpoint, Button, Dialog, DialogContent } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
  size?: Breakpoint;
  handleConfirm?: () => void;
}

export default function Modal({ open, children, size = "sm" }: Props) {
  return (
    <Dialog open={open} maxWidth={size} fullWidth>
      <DialogContent sx={{ p: 3.5 }}>{children}</DialogContent>
    </Dialog>
  );
}
