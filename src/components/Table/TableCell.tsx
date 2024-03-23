"use client";

import { ReactNode } from "react";
import {
  TableCell as MuiTableCell,
  TableCellProps,
  useTheme,
} from "@mui/material";

interface Props {
  children?: ReactNode;
}

export default function TableCell({
  children,
  ...props
}: Props & Partial<TableCellProps>) {
  const theme = useTheme();

  return (
    <MuiTableCell
      {...props}
      sx={{ backgroundColor: theme.palette.background.paper, ...props.sx }}
    >
      {children}
    </MuiTableCell>
  );
}
