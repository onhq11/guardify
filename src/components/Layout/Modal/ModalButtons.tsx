import { Button } from "@mui/material";
import { PiCheckCircle, PiMinusCircle } from "react-icons/pi";
import Flex from "@/components/Layout/Flex";

interface Props {
  handleClose?: () => void;
  handleConfirm?: () => void;
}

export default function ModalButtons({
  handleClose = () => {},
  handleConfirm = () => {},
}: Props) {
  return (
    <Flex end sx={{ gap: 1, mt: 2 }}>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<PiMinusCircle />}
        onClick={handleClose}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        startIcon={<PiCheckCircle />}
        type="submit"
        onClick={handleConfirm}
      >
        Submit
      </Button>
    </Flex>
  );
}
