import "animate.css"
import "@fontsource/source-sans-pro/400.css"
import "@fontsource/source-sans-pro/700.css"

import { CacheProvider, EmotionCache } from "@emotion/react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"
import type { AppProps } from "next/app"
import Head from "next/head"
import React from "react"

import config from "~/config"
import SiteContextProvider from "~/contexts/SiteContext"
import createEmotionCache from "~/styles/createEmotionCache"
import theme from "~/styles/theme"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface Props extends AppProps {
  emotionCache?: EmotionCache
}

function OtsWeb(props: Props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <SiteContextProvider value={config}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />

          <Component {...pageProps} />
        </SiteContextProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
export default OtsWeb
