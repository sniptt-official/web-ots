import dynamic from "next/dynamic"
import React from "react"

const NoSsr: React.FC = (props) => (
  <React.Fragment>{props.children}</React.Fragment>
)

// Also export a NoSSR Higher-Order component for situations where we need to access
// client side properties before rendering.
export const withNoSsr = (WrappedComponent: React.ComponentType) =>
  dynamic(() => Promise.resolve(WrappedComponent), {
    ssr: false,
  })

export default dynamic(() => Promise.resolve(NoSsr), { ssr: false })
