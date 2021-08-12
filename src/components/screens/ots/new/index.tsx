import { NextSeo } from "next-seo"
import React from "react"

import Layout from "~/components/layouts/Layout"
import useSiteContext from "~/hooks/useSiteContext"

import OtsCta from "./OtsCta"
import OtsFeatures from "./OtsFeatures"
import OtsTerminal from "./OtsTerminal"

export default function CreateOneTimeSecretScreen() {
  const { organizationName } = useSiteContext()

  return (
    <Layout>
      <NextSeo
        title={`Create One-Time Secret | ${organizationName}`}
        description="The safest way to send secrets over the wire."
      />

      <OtsTerminal />
      <OtsFeatures />
      <OtsCta />
    </Layout>
  )
}
