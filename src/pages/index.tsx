import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  chakra,
  Container,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  ScaleFade,
  SlideFade,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  useBreakpointValue,
  useClipboard,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { DiGithubBadge } from "react-icons/di"

import AnnouncementBar from "~/components/AnnouncementBar"
import Footer from "~/components/Footer"
import Header from "~/components/Header"
import AlertCircleOutlineIcon from "~/components/icons/AlertCircleOutlineIcon"
import CopyOutlineIcon from "~/components/icons/CopyOutlineIcon"
import ShieldCheckmarkIcon from "~/components/icons/ShieldCheckmarkIcon"
import CodeBlock from "~/components/mdx/CodeBlock"
import Seo from "~/components/Seo"
import Terminal, {
  AnimatedTerminal,
  spinnerFrames,
} from "~/components/Terminal"
import siteConfig from "~/config"
import useOneTimeSecret, { OneTimeSecret } from "~/hooks/useOneTimeSecret"
import { Region } from "~/types"

const defaultRegion = Region.US
const defaultExpiryInSeconds = 86_400 // 24 hours.
const maxSecretLength = 2048

const baseAnimatingTerminalLines = [
  {
    cmd: false,
    text: (
      <span>
        <Box as="span" color="green.500">
          ✔️
        </Box>
        &nbsp;Successfully created secure one-time URL
      </span>
    ),
    frames: spinnerFrames.map(function (spinner) {
      return {
        text: (
          <span>
            <Box as="span" color="cyan.200">
              {spinner}
            </Box>
            &nbsp;Creating one-time URL...
          </span>
        ),
        delay: 10,
      }
    }),
  },
]

function OtsTerminalInput() {
  const [secret, setSecret] = useState("")
  const [region, setRegion] = useState<Region>(defaultRegion)
  const [expiresIn, setExpiresIn] = useState(defaultExpiryInSeconds)
  const [copyButtonVisible, setCopyButtonVisible] = useState(false)
  const toast = useToast()

  const { createOneTimeSecret, data, loading, error, clear } =
    useOneTimeSecret()

  const { onCopy } = useClipboard(data?.url ?? "")

  useEffect(() => {
    if (error) {
      toast({
        id: "error",
        title: "Something went wrong",
        description: error.message,
        status: "error",
        position: "top",
      })
    }
  }, [error])

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

  const handleFormReset = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setSecret("")
    setCopyButtonVisible(false)
    clear()
  }

  const handleSubmit = async () => {
    if (secret.trim().length === 0) {
      if (!toast.isActive("warning")) {
        return toast({
          id: "warning",
          title: "Missing secret",
          description: "Type or paste a secret below",
          status: "info",
          position: "top",
        })
      } else {
        return
      }
    }

    await createOneTimeSecret({
      region,
      secret,
      expiresIn,
    })
  }

  const showLoadingTerminal = () => (
    <AnimatedTerminal terminalLines={baseAnimatingTerminalLines} />
  )

  const showOneTimeSecretTerminal = ({ url, expiresAt }: OneTimeSecret) => (
    <>
      <AnimatedTerminal
        onComplete={() => setCopyButtonVisible(true)}
        footer={<></>}
        terminalLines={[
          ...baseAnimatingTerminalLines,
          {
            text: (
              <span>
                <br />
                ✨&nbsp; Your secret is now available on the below URL.
                <br />
                <br />
                <span>
                  <strong>{url}</strong>
                </span>
                <br />
                <br />
                <span>
                  You should only share this URL with the intended recipient.
                </span>
                <br />
                <br />
                <span>
                  Please note that once retrieved, the secret will no longer be
                  available for viewing. If not viewed, the secret will
                  automatically expire at approximately {expiresAt}.
                </span>
              </span>
            ),
            cmd: false,
          },
        ]}
      />

      {document.queryCommandSupported("copy") && copyButtonVisible && (
        <SlideFade in={true} offsetY="40px">
          <VStack justifyContent="center" spacing="8" pt="2" pb="4">
            <Button
              isFullWidth
              colorScheme="teal"
              size="lg"
              onClick={copyToClipboard}
              leftIcon={<CopyOutlineIcon />}
            >
              Copy One-time URL
            </Button>

            <Button variant="link" size="lg" onClick={handleFormReset}>
              Share a new secret
            </Button>
          </VStack>
        </SlideFade>
      )}
    </>
  )

  const showInputTerminal = () => (
    <ScaleFade initialScale={0.9} in={true}>
      <Terminal
        disableGutters
        inputProps={{
          placeholder:
            "→ Type or paste what you want to securely share here...",
          onChange: (e) => setSecret(e.target.value),
          value: secret,
          maxLength: 2048,
          autoFocus: true,
          sx: {
            px: { base: 4, sm: 6 },
          },
        }}
        footer={
          <HStack
            sx={{
              ...(secret.length === maxSecretLength && { color: "red.500" }),
            }}
          >
            {secret.length === maxSecretLength && <AlertCircleOutlineIcon />}
            <span>
              {secret.length} / {maxSecretLength}
            </span>
          </HStack>
        }
        footerTooltip={`Secret character length limit`}
      />
    </ScaleFade>
  )

  return (
    <Container maxW="5xl" my="6">
      {data?.url
        ? showOneTimeSecretTerminal(data)
        : loading
        ? showLoadingTerminal()
        : showInputTerminal()}

      <SlideFade in={!(loading || data?.url)} offsetY="40px" unmountOnExit>
        <Accordion allowToggle pt="2" pb="4">
          <AccordionItem
            // See https://github.com/chakra-ui/chakra-ui/issues/4328.
            id="accordion-button-1"
            bgColor={useColorModeValue("gray.50", "gray.700")}
            borderRadius="md"
            borderColor={useColorModeValue("gray.200", "whiteAlpha.200")}
            borderWidth="1px"
          >
            <h2>
              <AccordionButton py={{ base: 2, sm: 5 }}>
                <Box flex="1" textAlign="left">
                  Show more options
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel>
              <Stack
                direction={["column", "column", "row"]}
                spacing="8"
                px={[0, 6]}
              >
                <FormControl as="fieldset" id="region-form-control">
                  <FormLabel as="legend">Secret region</FormLabel>

                  <RadioGroup
                    name="region"
                    defaultValue={defaultRegion}
                    onChange={(value: Region) => setRegion(value)}
                    colorScheme="teal"
                  >
                    <Stack direction="row" spacing="6">
                      <Radio id="radio-1" value="us-east-1">
                        North America
                      </Radio>
                      <Radio id="radio-2" value="eu-central-1">
                        Europe
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <FormHelperText>
                    Choose where we store your secret
                  </FormHelperText>
                </FormControl>

                <FormControl as="fieldset" id="expiry-form-control">
                  <FormLabel>Secret expiration (days)</FormLabel>
                  <Box mx="4">
                    <Slider
                      id="slider"
                      focusThumbOnChange={false}
                      colorScheme="teal"
                      defaultValue={1}
                      min={1}
                      max={7}
                      step={1}
                      onChangeEnd={(value) => {
                        setExpiresIn(value * defaultExpiryInSeconds)
                      }}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>

                      <SliderThumb boxSize={4} />
                    </Slider>
                  </Box>
                  <Flex justifyContent="space-between">
                    <Text fontSize="xs">1 day</Text>

                    <Text fontSize="xs">7 days</Text>
                  </Flex>
                  <FormHelperText>The end is inevitable...</FormHelperText>
                </FormControl>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Button
          isFullWidth
          size={useBreakpointValue({ base: "md", sm: "lg" })}
          colorScheme="teal"
          leftIcon={<ShieldCheckmarkIcon />}
          onClick={handleSubmit}
          disabled={loading}
          isLoading={loading}
        >
          Encrypt and create One-Time URL
        </Button>
      </SlideFade>
    </Container>
  )
}

const NewOneTimeSecretScreen = () => {
  return (
    <>
      <Seo
        title="Sniptt - The secret manager built for developers."
        description="The safest way to send secrets over the wire."
      />

      <AnnouncementBar
        text={siteConfig.announcementBar.text}
        url={siteConfig.announcementBar.url}
      />

      <Header />

      <chakra.div as="main">
        <Box as="section" py={{ base: "3rem", md: "6rem" }}>
          <Container maxW="7xl">
            <chakra.h1
              maxWidth="24ch"
              m="auto"
              fontSize={{ base: "2.25rem", sm: "3rem", lg: "4rem" }}
              fontFamily="heading"
              letterSpacing="tighter"
              fontWeight="extrabold"
              mb="16px"
              lineHeight="1.2"
              textAlign="center"
              bgGradient="linear(to-r, teal.500, purple.500)"
              bgClip="text"
            >
              Share end-to-end encrypted secrets with others via a one-time URL
            </chakra.h1>

            <Text
              maxW="5xl"
              m="auto"
              color={useColorModeValue("gray.500", "gray.400")}
              fontSize={{ base: "lg", lg: "xl" }}
              mt="6"
              textAlign="center"
            >
              Use to securely share sensitive secrets such as API keys, signing
              secrets, passwords and more with 3rd parties or with your team.
              Secrets are destroyed 💥 once viewed, or after specified expiry
            </Text>

            <OtsTerminalInput />
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

export default NewOneTimeSecretScreen
