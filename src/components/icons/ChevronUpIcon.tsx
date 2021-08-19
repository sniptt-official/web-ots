import { Icon, IconProps } from "@chakra-ui/react"
import * as React from "react"

export default function ChevronUpIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 512 512" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
        d="M112 328l144-144 144 144"
      />
    </Icon>
  )
}
