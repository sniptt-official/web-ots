/* eslint-disable max-len */
import { SvgIconProps } from "@material-ui/core"
import SvgIcon from "@material-ui/core/SvgIcon"
import React from "react"

const CopyOutline = ({
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
      <rect
        x="128"
        y="128"
        width="336"
        height="336"
        rx="57"
        ry="57"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <path
        d="M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </SvgIcon>
  )
}

export default CopyOutline
