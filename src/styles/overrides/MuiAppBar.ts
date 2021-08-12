import { Theme } from "@material-ui/core"

const overrideComponent = (theme: Theme) => ({
  MuiAppBar: {
    styleOverrides: {
      colorDefault: {
        backgroundColor: theme.palette.background.default,
      },
    },
  },
})

export default overrideComponent
