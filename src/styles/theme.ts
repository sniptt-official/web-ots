import { createTheme } from "@material-ui/core"

import overrideMuiAppBar from "./overrides/MuiAppBar"
import overrideMuiButton from "./overrides/MuiButton"
import overrideMuiCssBaseline from "./overrides/MuiCssBaseline"
import overrideMuiDrawer from "./overrides/MuiDrawer"
import overrideMuiLink from "./overrides/MuiLink"
import overrideMuiPaper from "./overrides/MuiPaper"

export const monospaceFontFamily = [
  "SFMono-Regular",
  "Menlo",
  "Monaco",
  "Consolas",
  "Liberation Mono",
  "Courier New",
  "monospace",
].join(",")

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
}

const mixins = {
  toolbar: {
    minHeight: 80,
  },
}

export const theme = createTheme({
  mixins,
  breakpoints,
  palette: {
    mode: "dark",
    background: {
      default: "#21222c",
      paper: "#262833",
      dark: "#141725",
    },
    primary: {
      main: "#6c69a0",
      dark: "#5f5c92",
    },
    secondary: {
      main: "#fff",
    },
    info: {
      light: "#81d3f9",
      main: "#b1b5d3",
    },
    grey: {
      "100": "rgba(255, 255, 255, 0.1)",
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    monospaceFontFamily: monospaceFontFamily,
    fontFamily: [
      "Source Sans Pro",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Ubuntu",
      "Cantarell",
      "Helvetica",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Android Emoji",
      "EmojiSymbols",
      "EmojiOne Mozilla",
      "Twemoji Mozilla",
      "Segoe UI Symbol",
      "Noto Color Emoji",
    ].join(","),
    h1: {
      fontSize: "4.5rem",
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: "-0.025em",
      [`@media (max-width: ${breakpoints.values.lg}px)`]: {
        fontSize: "2.5rem",
      },
    },
    h5: {
      lineHeight: 1.5,
    },
  },
})

const themeWithOverrides = createTheme(
  {
    mixins,
    components: {
      ...overrideMuiCssBaseline(theme),
      ...overrideMuiAppBar(theme),
      ...overrideMuiButton(theme),
      ...overrideMuiDrawer(theme),
      ...overrideMuiLink(theme),
      ...overrideMuiPaper(theme),
    },
  },
  theme,
)

export default themeWithOverrides
