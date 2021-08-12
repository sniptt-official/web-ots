import Stack from "@material-ui/core/Stack"
import { NextSeo } from "next-seo"
import React from "react"

import { withNoSsr } from "~/components/elements/NoSsr"
import Typography from "~/components/elements/Typography"
import Layout from "~/components/layouts/Layout"
import useSiteContext from "~/hooks/useSiteContext"

function CreateOneTimeSecretScreen() {
  const { organizationName } = useSiteContext()

  return (
    <Layout>
      <NextSeo
        title={`Page Not Found | ${organizationName}`}
        description="The safest way to send secrets over the wire."
      />

      <Stack
        alignItems="center"
        justifyContent="center"
        py={20}
        textAlign="left"
      >
        <Typography variant="h1" gutterBottom>
          #404 🥲
        </Typography>

        <Typography variant="h6">
          Sorry, we could not find what you were looking for.
        </Typography>
      </Stack>
    </Layout>
  )
}

export default withNoSsr(CreateOneTimeSecretScreen)
