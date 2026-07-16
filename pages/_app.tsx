import type { AppProps } from "next/app";
import { CssBaseline, NextUIProvider, createTheme } from "@nextui-org/react";
import "../styles/globals.css";

const theme = createTheme({
  type: "dark",
  theme: {
    colors: {
      primaryLight: "#79a7ff",
      primary: "#3b82f6",
      primaryDark: "#2563eb"
    },
    fonts: {
      sans: "Inter, 'Segoe UI', system-ui, sans-serif"
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
