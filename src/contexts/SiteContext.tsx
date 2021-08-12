import React, { PropsWithChildren } from "react"

import { SiteConfig } from "~/types"

type SiteContextProviderType = { value?: SiteConfig }

export const SiteContext = React.createContext<SiteConfig | undefined>(
  undefined,
)

const SiteContextProvider = ({
  children,
  value,
}: PropsWithChildren<SiteContextProviderType>) => (
  <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
)

export default SiteContextProvider
