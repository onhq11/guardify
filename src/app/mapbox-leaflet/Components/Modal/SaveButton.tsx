import { Button, ButtonProps } from "@mui/material";

export default function SaveButton(props: ButtonProps) {
  return (
    <Button variant="contained" color="success" size="small" {...props}>
      {props.children ? props.children : "Zapisz"}
    </Button>
  );
}
