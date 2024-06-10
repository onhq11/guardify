"use client";

import { usePathname } from "next/navigation";
import { Typography, useTheme } from "@mui/material";
import { getRouteInfoByUrl } from "@/utils/route";
import { MenuModeContext } from "@/components/Provider/MenuModeProvider";
import { useContext, useEffect } from "react";
import Flex from "@/components/Layout/Flex";
import DrawerExpandButton from "@/components/Layout/Menu/DrawerExpandButton";
import { HeadingContext } from "@/components/Provider/HeadingProvider";

export default function Heading() {
  const pathname = usePathname();
  const theme = useTheme();
  const { handleOpen, isDrawer } = useContext(MenuModeContext);
  const { title } = useContext(HeadingContext);

  return (
    <Flex alignCenter sx={{ mt: 4, gap: 2 }}>
      {isDrawer && <DrawerExpandButton onClick={handleOpen} />}
      <Typography
        sx={{
          fontWeight: 100,
          fontSize: 40,
          fontFamily: "sans-serif",
          color: theme.palette.text.secondary,
          textTransform: "capitalize",
        }}
      >
        {title || getRouteInfoByUrl(pathname)?.label}
      </Typography>
    </Flex>
  );
}
