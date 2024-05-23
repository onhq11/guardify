"use client";

import theme from "@/config/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { SnackbarProvider } from "notistack";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import MenuModeProvider from "@/components/Provider/MenuModeProvider";
import ToolbarModeProvider from "@/components/Provider/ToolbarModeProvider";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <AppRouterCacheProvider>
      <SnackbarProvider>
        <ThemeProvider theme={theme}>
          <MenuModeProvider>
            <ToolbarModeProvider>
              <CssBaseline enableColorScheme />
              {children}
            </ToolbarModeProvider>
          </MenuModeProvider>
        </ThemeProvider>
      </SnackbarProvider>
    </AppRouterCacheProvider>
  );
}
