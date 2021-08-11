import {
  Box,
  Button,
  chakra,
  Container,
  Divider,
  SlideFade,
  Text,
  useClipboard,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { DiGithubBadge } from "react-icons/di"

import Footer from "~/components/Footer"
import Header from "~/components/Header"
import CopyOutlineIcon from "~/components/icons/CopyOutlineIcon"
import CodeBlock from "~/components/mdx/CodeBlock"
import { withNoSsr } from "~/components/NoSsr"
import Seo from "~/components/Seo"
import { AnimatedTerminal, Line, spinnerFrames } from "~/components/Terminal"
import siteConfig from "~/config"
import api from "~/services/api"
import { Region } from "~/services/api/types"
import { decryptMessage } from "~/utils/crypto"

const ViewOneTimeSecretScreen = () => {
  const { query, isReady } = useRouter()
  const [secret, setSecret] = useState<string>("")
  const [copyButtonVisible, setCopyButtonVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()
  const toast = useToast()
  const { onCopy } = useClipboard(secret)

  // Get secret ID and key from URL fragment.
  const { id: secretId, region } = query as { id: string; region: Region }
  const secretPassword = window.location.hash

  const copyToClipboard = () => {
    onCopy()

    if (!toast.isActive("success")) {
      return toast({
        id: "success",
        title: "Copied!",
        description: "Secret copied to clipboard",
        status: "success",
        position: "top",
      })
    } else {
      return
    }
  }

  const terminalLines: Array<Line> = [
    {
      text: `ots get ${secretId} --region ${region}`,
      cmd: true,
    },
    {
      text: (
        <span>
          <Box as="span" color="green.500">
            ✔️
          </Box>
          &nbsp;Successfully decrypted secret
        </span>
      ),
      cmd: false,
      repeat: false,
      frames: spinnerFrames.map(function (spinner) {
        return {
          text: (
            <span>
              <Box as="span" color="cyan.200">
                {spinner}
              </Box>
              &nbsp;Decrypting secret...
            </span>
          ),
          delay: 80,
        }
      }),
    },
    {
      text: (
        <>
          <br />
          <Box as="span" whiteSpace="pre-wrap">
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
          message: (error as Error).message,
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
      <Seo
        title="Sniptt - The secret manager built for developers."
        description="The safest way to send secrets over the wire."
      />

      <Header />

      <chakra.div as="main">
        <Box as="section" py={{ base: "3rem", md: "6rem" }}>
          <Container maxW="5xl">
            <chakra.h1
              m="auto"
              fontSize={{ base: "2.25rem", sm: "3rem", lg: "4rem" }}
              fontFamily="heading"
              letterSpacing="tighter"
              fontWeight="extrabold"
              mb="4"
              lineHeight="1.2"
              textAlign="center"
              bgGradient="linear(to-r, teal.500, purple.500)"
              bgClip="text"
            >
              Decrypting One-Time Secret
            </chakra.h1>

            <Text
              maxW="5xl"
              m="auto"
              color={useColorModeValue("gray.500", "gray.400")}
              fontSize={{ base: "lg", lg: "xl" }}
              mt="6"
              textAlign="center"
            >
              OTS is the easiest way to share secrets with others.
            </Text>

            <Box py="4">
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
                          <Box as="span" color="gray.500">
                            This secret may have expired or has been read
                            already
                          </Box>
                          <br />
                          <br />
                          <Box as="span" color="gray.500">
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

              <SlideFade in>
                <Text textAlign="center" mt="2" mb="4">
                  💜&nbsp;
                  <strong>Thanks for using Sniptt!</strong>
                  &nbsp;{siteConfig.tagline}!
                </Text>
              </SlideFade>

              {document.queryCommandSupported("copy") && copyButtonVisible && (
                <SlideFade in offsetY="40px">
                  <Button
                    isFullWidth
                    colorScheme="teal"
                    size="lg"
                    onClick={copyToClipboard}
                    leftIcon={<CopyOutlineIcon />}
                  >
                    Copy Secret to Clipboard
                  </Button>
                </SlideFade>
              )}
            </Box>
          </Container>
        </Box>
      </chakra.div>

      <Divider />

      <Box as="section" py={{ base: "3rem", md: "6rem" }}>
        <Container maxW="7xl">
          <chakra.h1
            maxWidth="20ch"
            m="auto"
            fontSize={{ base: "2.25rem", sm: "3rem", lg: "4rem" }}
            fontFamily="heading"
            letterSpacing="tighter"
            fontWeight="extrabold"
            mb="16px"
            lineHeight="1.2"
            textAlign="center"
          >
            Share from your terminal
          </chakra.h1>

          <Text
            maxW="xl"
            m="auto"
            color={useColorModeValue("gray.500", "gray.400")}
            fontSize={{ base: "lg", lg: "xl" }}
            mt="6"
            textAlign="center"
          >
            Install our zero-configuration CLI
          </Text>
          <Box maxW="lg" m="auto">
            <CodeBlock className="shell" hideCopyButton>
              brew install ots
            </CodeBlock>
          </Box>
          <Box textAlign="center">
            <Button
              as="a"
              size="lg"
              href={siteConfig.repo.url}
              target="__blank"
              leftIcon={<DiGithubBadge size="1.5em" />}
              textAlign="center"
            >
              Visit us on GitHub
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  )
}

export default withNoSsr(ViewOneTimeSecretScreen)
