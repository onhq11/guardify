import { Button, ButtonProps } from "@mui/material";

export default function CancelButton(props: ButtonProps) {
  return (
    <Button variant="contained" color="primary" size="small" {...props}>
      {props.children ? props.children : "Anuluj"}
    </Button>
  );
}
