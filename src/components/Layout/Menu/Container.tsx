"use client";

import { ReactNode, useContext } from "react";
import { Box, Drawer } from "@mui/material";
import { MenuModeContext } from "@/components/Provider/MenuModeProvider";
import Sidebar from "@/components/Layout/Menu/Sidebar";

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  const { isDrawer, open, handleClose } = useContext(MenuModeContext);

  const menuBody = <Sidebar>{children}</Sidebar>;

  return isDrawer ? (
    <Drawer open={open} onClose={handleClose}>
      {menuBody}
    </Drawer>
  ) : (
    menuBody
  );
}
