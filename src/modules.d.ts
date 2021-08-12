import React from "react"

declare module "@material-ui/core/styles/createPalette" {
  interface TypeBackground {
    dark: string
  }

  interface Palette {
    background: TypeBackground
  }
}

declare module "@material-ui/core/styles/createTypography" {
  interface FontStyle {
    monospaceFontFamily: React.CSSProperties<"fontFamily">
  }
}
