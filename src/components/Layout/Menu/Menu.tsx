"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import icon from "@/assets/horizontal-logo.png";
import { ReactNode } from "react";
import Flex from "@/components/Layout/Flex";

interface Props {
  children: ReactNode;
}

export default function Menu({ children }: Props) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: 275,
        backgroundColor: "#252c48",
        px: 3,
      }}
    >
      <Flex center sx={{ mt: 2, position: "relative", height: "50px" }}>
        <Image
          src={icon}
          layout="fill"
          objectFit="contain"
          alt={"Guardify"}
          style={{
            marginTop: "15px",
          }}
        />
      </Flex>
      <Flex column sx={{ gap: 1, mt: 4 }}>
        {children}
      </Flex>
    </Box>
  );
}
