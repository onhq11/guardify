"use client";

import { usePathname } from "next/navigation";
import { Typography, useTheme } from "@mui/material";
import { getRouteInfoByUrl } from "@/utils/route";

export default function Heading() {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <Typography
      sx={{
        fontWeight: 100,
        fontSize: 40,
        fontFamily: "sans-serif",
        color: theme.palette.text.secondary,
        textTransform: "capitalize",
        mt: 4,
      }}
    >
      {getRouteInfoByUrl(pathname)?.label}
    </Typography>
  );
}
