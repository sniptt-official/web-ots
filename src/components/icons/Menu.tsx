import { SvgIconProps } from "@material-ui/core"
import SvgIcon from "@material-ui/core/SvgIcon"
import React from "react"

const MenuIcon = ({
  width = 30,
  height = 30,
  className,
  ...restProps
}: SvgIconProps): JSX.Element => {
  return (
    <SvgIcon
      className={className}
      style={{
        width,
        height,
      }}
      viewBox="0 0 30 30"
      aria-hidden="true"
      {...restProps}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M4 7h22M4 15h22M4 23h22"
      />
    </SvgIcon>
  )
}

export default MenuIcon
