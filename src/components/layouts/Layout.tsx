import Box from "@material-ui/core/Box"
import React, { PropsWithChildren } from "react"

import Footer from "~/components/layouts/Footer"
import Navbar from "~/components/layouts/Navbar"
import useSiteContext from "~/hooks/useSiteContext"

type Props = {
  noFooter?: boolean
}

const Layout = (props: PropsWithChildren<Props>): JSX.Element => {
  const { children, noFooter } = props
  const {
    footer: { links },
  } = useSiteContext()

  return (
    <>
      <Navbar />
      <Box component="main" flex="1 0 auto">
        {children}
      </Box>
      {!noFooter && <Footer links={links} />}
    </>
  )
}

export default Layout
