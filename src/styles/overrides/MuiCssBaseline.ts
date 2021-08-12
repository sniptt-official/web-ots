import { Theme } from "@material-ui/core"

import { monospaceFontFamily } from "../theme"

const overrideComponent = (theme: Theme) => ({
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        height: "100%",
      },
      body: {
        height: "100%",
      },
      "#__next": {
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
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
        background: theme.palette.info.main,
      },
      "::-webkit-scrollbar-corner": {
        background: "transparent",
      },
      // Firefox.
      "*": {
        scrollbarColor: `${theme.palette.info.main} transparent`,
        scrollbarWidth: "thin",
      },
      pre: {
        backgroundColor: theme.palette.background.dark,
        borderRadius: Number(theme.shape.borderRadius) * 2,
        color: theme.palette.common.white,
        fontSize: 16,
        fontFamily: monospaceFontFamily,
        overflow: "auto",
        padding: "1rem 1.5rem",
        margin: "0 0 18px",
      },
      code: {
        fontFamily: monospaceFontFamily,
        fontSize: 16,
        borderRadius: Number(theme.shape.borderRadius) * 2,
        verticalAlign: "middle",
      },
      "@keyframes BlinkingCursor": {
        "0%": {
          visibility: "hidden",
        },
        "50%": {
          visibility: "visible",
        },
      },
    },
  },
})

export default overrideComponent
