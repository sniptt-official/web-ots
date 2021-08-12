import { Theme } from "@material-ui/core"

const overrideComponent = (_theme: Theme) => ({
  MuiDrawer: {
    styleOverrides: {
      paper: {
        minWidth: 240,
        backgroundImage: "none",
      },
    },
  },
})

export default overrideComponent
