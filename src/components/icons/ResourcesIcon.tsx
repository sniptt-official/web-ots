/* eslint-disable max-len */
import { chakra, HTMLChakraProps } from "@chakra-ui/react"
import * as React from "react"

export default function ResourcesIcon(props: HTMLChakraProps<"svg">) {
  return (
    <chakra.svg
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      color="white"
      {...props}
    >
      <path
        d="M17.7826 8.65217V7.43478C17.7826 7.27335 17.7184 7.11852 17.6043 7.00437C17.4901 6.89022 17.3353 6.82609 17.1739 6.82609H12.913L11.6956 5H7.43475C7.27331 5 7.11849 5.06413 7.00433 5.17828C6.89018 5.29244 6.82605 5.44726 6.82605 5.6087V8.65217H17.7826Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      <path
        d="M19.6087 10.8696C19.6087 10.3173 19.161 9.86956 18.6087 9.86956H6C5.44771 9.86956 5 10.3173 5 10.8696V17.1739C5 17.6582 5.19239 18.1227 5.53485 18.4652C5.87731 18.8076 6.34178 19 6.82609 19H17.7826C18.2669 19 18.7314 18.8076 19.0738 18.4652C19.4163 18.1227 19.6087 17.6582 19.6087 17.1739V10.8696Z"
        fill="currentColor"
      />
    </chakra.svg>
  )
}
