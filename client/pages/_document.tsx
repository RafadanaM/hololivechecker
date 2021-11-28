import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="Hololive checker, Check hololive members live stream activity on youtube!"
          />
          <meta
            property="og:description"
            content="Hololive checker, Check hololive members youtube live stream activity!"
          />
          <meta
            property="og:title"
            content="Check hololive members youtube live stream!"
          />
          <meta
            property="og:url"
            content="https://https://hololivechecker.devs.id/"
          />
          <meta property="og:type" content="website" />
          <meta
            name="google-site-verification"
            content="9XcYTUg-trV9a8kWUd-Z5iELoUndWJNKQdLy5YFUyGM"
          />
          <meta name="robots" content="index, follow" />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />

          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=optional"
          />

          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
