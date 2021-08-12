import { useContext } from "react"

import { SiteContext } from "~/contexts/SiteContext"

const useSiteContext = () => {
  const context = useContext(SiteContext)

  if (!context) {
    throw new Error("useSiteContext must be used within a SiteContextProvider")
  }

  return context
}

export default useSiteContext
