"use client";

import { alpha, Button, useTheme } from "@mui/material";
import { ReactNode, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SxProps } from "@mui/system";
import { MenuModeContext } from "@/components/Provider/MenuModeProvider";

interface Props {
  children: ReactNode;
  href: string;
  sx?: SxProps;
}

export default function NavButton({ children, href, sx }: Props) {
  const theme = useTheme();
  const pathname = usePathname();
  const { handleClose } = useContext(MenuModeContext);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (pathname === href && handleClose && clicked) {
      handleClose();
    }
  }, [pathname, clicked]);

  return (
    <Button
      color="secondary"
      sx={{
        width: "100%",
        color: theme.palette.primary.contrastText,
        borderLeft: `5px solid transparent`,
        ...(pathname === href && {
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
          borderLeft: `5px solid ${theme.palette.primary.main}`,
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.3),
          },
        }),
        pl: 1,
        py: 1.25,
        borderRadius: 0,
        ...sx,
      }}
      onClick={() => setClicked(true)}
    >
      {children}
    </Button>
  );
}
