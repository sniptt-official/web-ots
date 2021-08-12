/* eslint-disable max-len */
import { SvgIconProps } from "@material-ui/core"
import SvgIcon from "@material-ui/core/SvgIcon"
import React from "react"

const LockClosed = ({
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
      <path d="M368 192h-16v-80a96 96 0 10-192 0v80h-16a64.07 64.07 0 00-64 64v176a64.07 64.07 0 0064 64h224a64.07 64.07 0 0064-64V256a64.07 64.07 0 00-64-64zm-48 0H192v-80a64 64 0 11128 0z" />
    </SvgIcon>
  )
}

export default LockClosed
