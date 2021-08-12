import { Theme } from "@material-ui/core"

const overrideComponent = (theme: Theme) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        fontWeight: theme.typography.fontWeightBold,
        padding: theme.spacing(1.8, 2.25),
      },
      contained: {
        backgroundColor: theme.palette.common.white,
      },
      containedPrimary: {
        backgroundColor: theme.palette.primary.main,
      },
      containedSizeSmall: {
        padding: theme.spacing(1.5, 2.25),
      },
      containedSizeLarge: {
        padding: theme.spacing(1.8, 2.25),
      },
      sizeSmall: {
        fontSize: theme.typography.fontSize,
      },
      sizeLarge: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
      },
    },
  },
})

export default overrideComponent
