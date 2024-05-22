"use client";

import { createContext, ReactNode, useState } from "react";
import { useBreakpointDown } from "@/utils/breakpoint";

interface Props {
  children: ReactNode;
}

interface ContextProps {
  isCollapsed?: boolean;
  open?: boolean;
  handleClose?: () => void;
  handleOpen?: () => void;
}

export const ToolbarModeContext = createContext<ContextProps>({});
export default function ToolbarModeProvider({ children }: Props) {
  const isCollapsed = useBreakpointDown("lg");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ToolbarModeContext.Provider
      value={{ isCollapsed, open, handleClose, handleOpen }}
    >
      {children}
    </ToolbarModeContext.Provider>
  );
}
