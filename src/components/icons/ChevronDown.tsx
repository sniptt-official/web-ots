import { SvgIconProps } from "@material-ui/core"
import SvgIcon from "@material-ui/core/SvgIcon"
import React from "react"

const ChevronDown = ({
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
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
        d="M112 184l144 144 144-144"
      />
    </SvgIcon>
  )
}

export default ChevronDown
