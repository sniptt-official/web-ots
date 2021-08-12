import { NextSeo } from "next-seo"
import React from "react"

import { withNoSsr } from "~/components/elements/NoSsr"
import Layout from "~/components/layouts/Layout"
import useSiteContext from "~/hooks/useSiteContext"

import OtsReader from "./OtsReader"
import OtsReaderCta from "./OtsReaderCta"

function CreateOneTimeSecretScreen() {
  const { organizationName } = useSiteContext()

  return (
    <Layout>
      <NextSeo
        title={`View One-Time Secret | ${organizationName}`}
        description="The safest way to send secrets over the wire."
      />

      <OtsReader />
      <OtsReaderCta />
    </Layout>
  )
}

export default withNoSsr(CreateOneTimeSecretScreen)
