import { ReactNode } from "react";
import { Box } from "@mui/material";

interface Props {
  children: ReactNode;
}

export default function Sidebar({ children }: Props) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: 270,
        minWidth: 270,
        backgroundColor: "#171717",
      }}
    >
      {children}
    </Box>
  );
}
