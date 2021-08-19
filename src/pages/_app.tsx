import { ChakraProvider } from "@chakra-ui/react"
import { CacheProvider } from "@emotion/react"
import type { AppProps } from "next/app"
import Head from "next/head"
import React from "react"

import FontFace from "~/components/FontFace"
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

      <FontFace />

      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </CacheProvider>
  )
}

export default App
