import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import React from "react"

import GithubIcon from "~/components/icons/Github"
import useSiteContext from "~/hooks/useSiteContext"

export default function OtsCta() {
  const siteConfig = useSiteContext()

  return (
    <Container maxWidth="md">
      <Box py={14.6} textAlign="center">
        <Typography variant="h1">Are you a terminal user?</Typography>

        <Box py={3.5} color="info.main" maxWidth={1024} margin="0 auto">
          <Typography variant="h5">
            Install our zero-configuration CLI
          </Typography>
        </Box>

        <Box textAlign="left" maxWidth={720} margin="0 auto">
          <pre>
            <code>{`brew install ots`}</code>
          </pre>
        </Box>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          href={siteConfig.githubUrl}
          disableElevation
          startIcon={<GithubIcon width={24} height={24} />}
        >
          Visit us on GitHub
        </Button>
      </Box>
    </Container>
  )
}
