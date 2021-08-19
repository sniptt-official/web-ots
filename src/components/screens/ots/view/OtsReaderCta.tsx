import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import React from "react"

import Typography from "~/components/elements/Typography"
import GithubIcon from "~/components/icons/Github"
import useSiteContext from "~/hooks/useSiteContext"

export default function OtsReaderCta() {
  const siteConfig = useSiteContext()

  const ctaCodeSnippet = `# Just want to send one-time secrets?
brew install ots

# Need to persist secrets?
brew tap sniptt-official/tap
brew install snip`

  return (
    <Container maxWidth="md">
      <Box py={14.6}>
        <Typography variant="h1" align="center">
          Want to share more secrets?
        </Typography>

        <Box py={3.5} color="info.main" maxWidth={1024} margin="0 auto">
          <Typography variant="h5" align="center">
            Install one of our easy-to-use CLIs
          </Typography>
        </Box>

        {/* TODO: Implement syntax highlighting */}
        <pre>
          <code className="language-shell">{ctaCodeSnippet}</code>
        </pre>

        <Box textAlign="center">
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
      </Box>
    </Container>
  )
}
