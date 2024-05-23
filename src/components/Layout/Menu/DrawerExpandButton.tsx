import { GoSidebarExpand } from "react-icons/go";
import { IconButton } from "@mui/material";

interface Props {
  onClick: (() => void) | undefined;
}

export default function DrawerExpandButton({ onClick }: Props) {
  return (
    <IconButton onClick={onClick} color="secondary">
      <GoSidebarExpand style={{ color: "#aab0bf" }} />
    </IconButton>
  );
}
