/* eslint-disable max-len */
import { chakra, HTMLChakraProps } from "@chakra-ui/react"
import * as React from "react"

export default function BlogIcon(props: HTMLChakraProps<"svg">) {
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
        d="M8.18182 16.0909V17.0455C8.18182 17.8046 7.422 17.9663 7.20182 17.9975C6.687 17.9835 6.27273 17.5628 6.27273 17.0455V5.27273H15.8182V14.8182H17.0909V4.63636C17.0909 4.28509 16.8058 4 16.4545 4H5.63636C5.28509 4 5 4.28509 5 4.63636V17.0455C5 18.2736 5.99909 19.2727 7.22727 19.2727H16.7727C18.0009 19.2727 19 18.2736 19 17.0455V16.0909H8.18182Z"
        fill="currentColor"
      />
      <path
        d="M13.2727 7.18182H8.81813C8.46667 7.18182 8.18176 7.46673 8.18176 7.81818C8.18176 8.16963 8.46667 8.45454 8.81813 8.45454H13.2727C13.6241 8.45454 13.909 8.16963 13.909 7.81818C13.909 7.46673 13.6241 7.18182 13.2727 7.18182Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      <path
        d="M13.2727 9.72727H8.81813C8.46667 9.72727 8.18176 10.0122 8.18176 10.3636C8.18176 10.7151 8.46667 11 8.81813 11H13.2727C13.6241 11 13.909 10.7151 13.909 10.3636C13.909 10.0122 13.6241 9.72727 13.2727 9.72727Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      <path
        d="M13.2727 12.2727H8.81813C8.46667 12.2727 8.18176 12.5576 8.18176 12.9091C8.18176 13.2605 8.46667 13.5455 8.81813 13.5455H13.2727C13.6241 13.5455 13.909 13.2605 13.909 12.9091C13.909 12.5576 13.6241 12.2727 13.2727 12.2727Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
    </chakra.svg>
  )
}
