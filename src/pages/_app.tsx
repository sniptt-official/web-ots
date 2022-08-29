import "@fontsource/inter"
import "@fontsource/inter/500.css";
import "@fontsource/inter/800.css";

import { ChakraProvider } from "@chakra-ui/react"
import { CacheProvider } from "@emotion/react"
import type { AppProps } from "next/app"
import Head from "next/head"
import React from "react"

import theme from "~/theme"
import createEmotionCache from "~/utils/createEmotionCache"

const emotionCache = createEmotionCache()

function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </CacheProvider>
  )
}

export default App
