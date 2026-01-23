import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import React from "react";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function MantineUIProvider({ children }: {children: React.ReactNode}) {
  return (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  );
}
