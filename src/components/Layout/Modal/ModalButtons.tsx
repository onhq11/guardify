import { PiCheckCircle, PiMinusCircle } from "react-icons/pi";
import Flex from "@/components/Layout/Flex";
import { LoadingButton } from "@mui/lab";

interface Props {
  handleClose?: () => void;
  handleConfirm?: () => void;
  loading?: boolean;
}

export default function ModalButtons({
  handleClose = () => {},
  handleConfirm = () => {},
  loading = false,
}: Props) {
  return (
    <Flex end sx={{ gap: 1, mt: 4 }}>
      <LoadingButton
        variant="outlined"
        color="secondary"
        startIcon={<PiMinusCircle />}
        onClick={handleClose}
        loading={loading}
      >
        Cancel
      </LoadingButton>
      <LoadingButton
        variant="contained"
        startIcon={<PiCheckCircle />}
        type="submit"
        onClick={handleConfirm}
        loading={loading}
      >
        Submit
      </LoadingButton>
    </Flex>
  );
}
