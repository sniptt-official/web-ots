import { Theme } from "@material-ui/core"

const overrideComponent = (theme: Theme) => ({
  MuiLink: {
    styleOverrides: {
      root: {
        transition: "color 200ms cubic-bezier(0.08, 0.52, 0.52, 1)",
        "&:hover": {
          color: theme.palette.primary.main,
        },
      },
    },
  },
})

export default overrideComponent
