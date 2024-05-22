"use client";

import { createContext, ReactNode, useState } from "react";
import { useBreakpointDown } from "@/utils/breakpoint";

interface Props {
  children: ReactNode;
}

interface ContextProps {
  isDrawer?: boolean;
  open?: boolean;
  handleClose?: () => void;
  handleOpen?: () => void;
}

export const MenuModeContext = createContext<ContextProps>({});
export default function MenuModeProvider({ children }: Props) {
  const isDrawer = useBreakpointDown("lg");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MenuModeContext.Provider
      value={{ isDrawer, open, handleClose, handleOpen }}
    >
      {children}
    </MenuModeContext.Provider>
  );
}
