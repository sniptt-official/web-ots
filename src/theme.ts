import { extendTheme, ThemeConfig } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

const config: ThemeConfig = {
  initialColorMode: "light",
}

export const monospaceFontFamily = [
  "SFMono-Regular",
  "Menlo",
  "Monaco",
  "Consolas",
  "Liberation Mono",
  "Courier New",
  "monospace",
].join(",")

const customTheme = extendTheme({
  config,
  colors: {
    gray: {
      700: "#262833",
      800: "#21222c",
      900: "#141725",
    },
    green: {
      500: "#0dbc79",
    },
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
    mono: monospaceFontFamily,
  },
  styles: {
    global: (props) => ({
      html: {
        height: "100%",
      },
      "#__next": {
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
      },
      main: {
        flex: "1 0 auto",
      },
      // Scrollbars.
      "*::-webkit-scrollbar": {
        width: "7px",
        height: "7px",
      },
      "*::-webkit-scrollbar-track": {
        borderRadius: 12,
        background: "transparent",
      },
      "::-webkit-scrollbar-thumb": {
        borderRadius: 12,
        background: "gray.600",
      },
      "::-webkit-scrollbar-corner": {
        background: "transparent",
      },
      body: {
        height: "100%",
        color: mode("gray.700", "whiteAlpha.900")(props),
        ".deleted": {
          color: "#ff8383 !important",
          fontStyle: "normal !important",
        },
        ".inserted": {
          color: "#b5f4a5 !important",
          fontStyle: "normal !important",
        },
      },
      "@keyframes BlinkingCursor": {
        "0%": {
          visibility: "hidden",
        },
        "50%": {
          visibility: "visible",
        },
      },
    }),
  },
  textStyles: {
    heading: {
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "bold",
      letterSpacing: "-0.015em",
      lineHeight: "1.24",
      fontSize: { base: "2rem", md: "3.5rem" },
    },
    "heading-2": {
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "bold",
      letterSpacing: "-0.015em",
      lineHeight: "1.24",
      fontSize: { base: "1.75rem", md: "2.75rem" },
    },
    caps: {
      textTransform: "uppercase",
      fontSize: "sm",
      letterSpacing: "widest",
      fontWeight: "bold",
    },
  },
  components: {
    Button: {
      sizes: {
        lg: {
          h: "4rem",
          px: "40px",
          fontSize: "1.2rem",
        },
      },
    },
  },
  mdx: {
    h1: {
      mt: "2rem",
      mb: ".25rem",
      lineHeight: 1.2,
      fontWeight: "bold",
      fontSize: "1.875rem",
      letterSpacing: "-.025em",
    },
    h2: {
      mt: "4rem",
      mb: "0.5rem",
      lineHeight: 1.3,
      fontWeight: "semibold",
      fontSize: "1.5rem",
      letterSpacing: "-.025em",
      "& + h3": {
        mt: "1.5rem",
      },
    },
    h3: {
      mt: "3rem",
      lineHeight: 1.25,
      fontWeight: "semibold",
      fontSize: "1.25rem",
      letterSpacing: "-.025em",
    },
    h4: {
      mt: "3rem",
      lineHeight: 1.375,
      fontWeight: "semibold",
      fontSize: "1.125rem",
    },
    a: {
      color: "teal.500",
      fontWeight: "semibold",
      transition: "color 0.15s",
      transitionTimingFunction: "ease-out",
      _hover: {
        color: "teal.600",
      },
    },
    p: {
      mt: "1.25rem",
      lineHeight: 1.7,
      "blockquote &": {
        mt: 0,
      },
    },
    hr: {
      my: "4rem",
    },
    blockquote: {
      bg: "orange.100",
      borderWidth: "1px",
      borderColor: "orange.200",
      rounded: "lg",
      px: "1.25rem",
      py: "1rem",
      my: "1.5rem",
    },
    ul: {
      mt: "1.5rem",
      ml: "1.25rem",
      "blockquote &": { mt: 0 },
      "& > * + *": {
        mt: "0.25rem",
      },
    },
    code: {
      rounded: "sm",
      px: "1",
      fontSize: "0.875em",
      py: "2px",
      whiteSpace: "nowrap",
      lineHeight: "normal",
    },
  },
})

export default customTheme
