import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import React, { useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "../theme";
import Head from "next/head";
import { StylesProvider } from "@material-ui/styles";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Hololive Stream Checker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          </ThemeProvider>
       </StylesProvider>
    </>
  );
}
export default MyApp;
