import { useTheme } from "@material-ui/core"
import {
  default as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from "@material-ui/core/Typography"

interface TypographyProps extends MuiTypographyProps {
  shaded?: boolean
}

const Typography = (props: TypographyProps): JSX.Element => {
  const { shaded, style, ...otherProps } = props
  const theme = useTheme()

  return (
    <MuiTypography
      style={
        shaded
          ? {
              ...style,
              background: `-webkit-linear-gradient(-70deg, ${theme.palette.primary.main}, ${theme.palette.info.light})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }
          : style
      }
      {...otherProps}
    />
  )
}

export default Typography
