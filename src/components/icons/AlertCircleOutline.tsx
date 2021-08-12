import { SvgIconProps } from "@material-ui/core"
import SvgIcon from "@material-ui/core/SvgIcon"
import React from "react"

const AlertCircleOutline = ({
  width = 24,
  height = 24,
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
      viewBox="0 0 512 512"
      aria-hidden="true"
      {...restProps}
    >
      <path
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
      />
      <path
        d="M250.26 166.05L256 288l5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 6z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <path d="M256 367.91a20 20 0 1120-20 20 20 0 01-20 20z" />
    </SvgIcon>
  )
}

export default AlertCircleOutline
