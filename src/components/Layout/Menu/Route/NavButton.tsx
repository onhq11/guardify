"use client";

import { Button, darken, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface Props {
  children: ReactNode;
  href: string;
}

export default function NavButton({ children, href }: Props) {
  const theme = useTheme();
  const pathname = usePathname();

  return (
    <Button
      color="secondary"
      sx={{
        width: "100%",
        textTransform: "capitalize",
        color: theme.palette.text.primary,
        borderRadius: "9px",
        ...(pathname === href && {
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: darken(theme.palette.primary.main, 0.2),
          },
        }),
      }}
    >
      {children}
    </Button>
  );
}
