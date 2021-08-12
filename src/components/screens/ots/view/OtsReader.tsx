import { useTheme } from "@material-ui/core"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import clsx from "clsx"
import { useRouter } from "next/dist/client/router"
import React, { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

import {
  AnimatedTerminal,
  Line,
  spinnerFrames,
} from "~/components/elements/Terminal"
import Typography from "~/components/elements/Typography"
import CopyOutlineIcon from "~/components/icons/CopyOutline"
import useSiteContext from "~/hooks/useSiteContext"
import { decryptMessage } from "~/libs/crypto"
import api from "~/services/api"
import { Region } from "~/types"

export default function OtsReader() {
  const { query, isReady } = useRouter()
  const { tagline } = useSiteContext()
  const theme = useTheme()
  const [secret, setSecret] = useState<string>()
  const [copyButtonVisible, setCopyButtonVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()

  // Get secret ID and key from URL fragment.
  const { id: secretId, region } = query as { id: string; region: Region }
  const secretPassword = window.location.hash

  const copyToClipboard = () => {
    if (secret) {
      navigator.clipboard
        .writeText(secret)
        .then(() => toast.success("Copied to clipboard.", { id: "clipboard" }))
    }
  }

  const terminalLines: Array<Line> = [
    {
      text: `ots get ${secretId} --region ${region}`,
      cmd: true,
    },
    {
      text: "Decrypting secret... ✅",
      cmd: false,
      repeat: false,
      frames: spinnerFrames.map(function (spinner) {
        return {
          text: "Decrypting secret..." + spinner,
          delay: 80,
        }
      }),
    },
    {
      text: (
        <>
          <br />
          <Box
            component="span"
            sx={{
              whiteSpace: "pre-wrap",
            }}
          >
            {secret}
          </Box>
        </>
      ),
      cmd: false,
    },
  ]

  useEffect(() => {
    // Fetch One-Time Secret.
    async function readSecret() {
      try {
        const { encryptedBytes } = await api.getSecret({
          region,
          secretId,
        })

        const plaintext = await decryptMessage(secretPassword, encryptedBytes)

        setSecret(plaintext)
      } catch (error) {
        console.error(error)
        setError({
          name: "ReadSecretFailed",
          message: error.message,
        })
      } finally {
        setLoading(false)
      }
    }

    // Wait until page has been hydrated before trying to read secret.
    if (isReady) {
      readSecret()
    }
  }, [isReady])

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: theme.palette.grey[800],
            color: theme.palette.common.white,
            fontSize: 18,
          },
        }}
      />

      <Container>
        <Box py={10} textAlign="center">
          <Typography variant="h1" shaded gutterBottom>
            Decrypting secret message below..
          </Typography>

          <Box maxWidth={860} margin="0 auto">
            {loading ? (
              <AnimatedTerminal
                key={1}
                terminalLines={[
                  {
                    cmd: false,
                    text: "",
                    repeat: true,
                    repeatCount: 1000,
                    frames: spinnerFrames.map(function (spinner) {
                      return {
                        text: spinner,
                        delay: 80,
                      }
                    }),
                  },
                ]}
              />
            ) : error ? (
              <AnimatedTerminal
                key={2}
                terminalLines={[
                  {
                    cmd: true,
                    text: "",
                  },
                  {
                    cmd: false,
                    text: (
                      <span>
                        <br />
                        <strong>This one-time secret cannot be viewed</strong>
                        <br />
                        <br />
                        <Box component="span" sx={{ color: "info.main" }}>
                          This secret may have expired or has been read already
                        </Box>
                        <br />
                        <br />
                        <Box component="span" sx={{ color: "info.main" }}>
                          Reminder: Once secrets have been read once, they are
                          permanently destroyed 💥
                        </Box>
                      </span>
                    ),
                  },
                ]}
              />
            ) : (
              <AnimatedTerminal
                key={3}
                terminalLines={terminalLines}
                interval={20}
                onComplete={() => setCopyButtonVisible(true)}
                footer={
                  <>
                    {secret &&
                      copyButtonVisible &&
                      `Decrypted secret is ${Buffer.byteLength(
                        Buffer.from(secret),
                      )} bytes long`}
                  </>
                }
              />
            )}

            <Box mb={2}>
              <Typography
                className={clsx("animate__animated", "animate__fadeInUp")}
                gutterBottom
              >
                💜&nbsp;&nbsp;&nbsp;&nbsp;
                <strong>Thanks for using Sniptt!</strong>
                &nbsp;{tagline}!
              </Typography>
            </Box>

            {document.queryCommandSupported("copy") && copyButtonVisible && (
              <Button
                className={clsx("animate__animated", "animate__fadeInUp")}
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={copyToClipboard}
                startIcon={<CopyOutlineIcon />}
              >
                Copy Secret to Clipboard
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </>
  )
}
