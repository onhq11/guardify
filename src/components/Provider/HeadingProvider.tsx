"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useBreakpointDown } from "@/utils/breakpoint";
import { usePathname } from "next/navigation";

interface Props {
  children: ReactNode;
}

interface ContextProps {
  title?: string;
  setTitle?: Dispatch<SetStateAction<string>>;
}

export const HeadingContext = createContext<ContextProps>({});
export default function HeadingProvider({ children }: Props) {
  const pathname = usePathname();
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle("");
  }, [pathname]);

  return (
    <HeadingContext.Provider value={{ title, setTitle }}>
      {children}
    </HeadingContext.Provider>
  );
}
