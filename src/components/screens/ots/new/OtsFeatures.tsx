import { useTheme } from "@material-ui/core"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import React from "react"

import Typography from "~/components/elements/Typography"
import EyeOff from "~/components/icons/EyeOff"
import Shield from "~/components/icons/Shield"
import Stopwatch from "~/components/icons/Stopwatch"

export default function OtsFeatures() {
  const theme = useTheme()

  const features = [
    {
      title: "End-to-end encryption",
      description: (
        <span>
          <Box
            component="span"
            sx={{
              color: "info.light",
              fontWeight: theme.typography.fontWeightBold,
            }}
          >
            Encryption and decryption is performed in the browser.
          </Box>{" "}
          Your encryption key is encoded in the one-time URL, and never leaves
          your browser.
        </span>
      ),
      IconComponent: Shield,
    },
    {
      title: "One-time URL",
      description: (
        <span>
          <Box
            component="span"
            sx={{
              color: "info.light",
              fontWeight: theme.typography.fontWeightBold,
            }}
          >
            The link can only be opened once.
          </Box>{" "}
          Once read, the encrypted secret is deleted from our server, never to
          be read again!
        </span>
      ),
      IconComponent: EyeOff,
    },
    {
      title: "Self destruct",
      description: (
        <span>
          All one-time encrypted secrets get{" "}
          <Box
            component="span"
            sx={{
              color: "info.light",
              fontWeight: theme.typography.fontWeightBold,
            }}
          >
            automatically deleted
          </Box>{" "}
          from our servers after 24 hours.
        </span>
      ),
      IconComponent: Stopwatch,
    },
  ]

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        transform: "skewY(-2deg)",
      }}
    >
      <Container>
        <Box sx={{ py: 14.6, transform: "skewY(2deg)" }}>
          <Typography variant="h1" shaded>
            Secure one-time sharing
          </Typography>

          <Box
            sx={{
              mt: 3.5,
              mb: 6,
              color: "info.main",
            }}
          >
            <Typography variant="h5">
              It&apos;s{" "}
              <strong>
                impossible for us or anyone else to read your secret
              </strong>{" "}
              without the client-side link you generate in this browser.
            </Typography>
          </Box>

          <Grid
            container
            spacing={4}
            alignItems="stretch"
            wrap="wrap"
            direction="row"
          >
            {features.map((feature, index) => {
              const { IconComponent, title, description } = feature

              return (
                <Grid item key={index} xs>
                  <Box
                    sx={{
                      bgcolor: "background.default",
                      borderRadius: 2,
                      minWidth: 260,
                      p: "1.5rem",
                      textAlign: "left",
                      height: "100%",
                    }}
                  >
                    <IconComponent width={64} height={64} />

                    <Box sx={{ pb: 2 }}>
                      <Typography variant="h5">
                        <strong>{title}</strong>
                      </Typography>
                    </Box>

                    <Typography variant="h6">{description}</Typography>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
