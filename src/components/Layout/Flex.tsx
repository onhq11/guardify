import { Box } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  wrap?: boolean;
  alignCenter?: boolean;
  between?: boolean;
  around?: boolean;
  center?: boolean;
  end?: boolean;
  column?: boolean;
  [key: string]: any;
}

export default function Flex({
  children,
  wrap,
  alignCenter,
  between,
  around,
  center,
  end,
  column,
  ...props
}: Props) {
  const additionalSx = {
    ...(wrap && { flexWrap: "wrap" }),
    ...(alignCenter && { alignItems: "center" }),
    ...(column && { flexDirection: "column" }),
    ...(between && { justifyContent: "space-between" }),
    ...(around && { justifyContent: "space-around" }),
    ...(center && { justifyContent: "center" }),
    ...(end && { justifyContent: "flex-end" }),
  };

  return (
    <Box {...props} sx={{ display: "flex", ...additionalSx, ...props.sx }}>
      {children}
    </Box>
  );
}
