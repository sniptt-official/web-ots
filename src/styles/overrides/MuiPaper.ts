import { Theme } from "@material-ui/core"

const overrideComponent = (theme: Theme) => ({
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.default,
      },
    },
  },
})

export default overrideComponent
