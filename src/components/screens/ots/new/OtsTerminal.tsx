import { useTheme } from "@material-ui/core"
import Accordion from "@material-ui/core/Accordion"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import Link from "@material-ui/core/Link"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import Slider from "@material-ui/core/Slider"
import Stack from "@material-ui/core/Stack"
import clsx from "clsx"
import React, { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

import Terminal, {
  AnimatedTerminal,
  spinnerFrames,
} from "~/components/elements/Terminal"
import Typography from "~/components/elements/Typography"
import AlertCircleOutlineIcon from "~/components/icons/AlertCircleOutline"
import ChevronDownIcon from "~/components/icons/ChevronDown"
import CopyOutlineIcon from "~/components/icons/CopyOutline"
import ShieldIcon from "~/components/icons/Shield"
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
        <Box color="#0dbc79" component="span">
          ✔️
        </Box>
        &nbsp;Successfully created secure one-time URL
      </span>
    ),
    frames: spinnerFrames.map(function (spinner) {
      return {
        text: (
          <span>
            <Box color="info.light" component="span">
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

export default function OtsTerminal() {
  const theme = useTheme()
  const [secret, setSecret] = useState("")
  const [region, setRegion] = useState<Region>(defaultRegion)
  const [expiresIn, setExpiresIn] = useState(defaultExpiryInSeconds)
  const [copyButtonVisible, setCopyButtonVisible] = useState(false)

  const { createOneTimeSecret, data, loading, error, clear } =
    useOneTimeSecret()

  useEffect(() => {
    if (error) {
      toast.error(error.message, { id: "error" })
    }
  }, [error])

  const copyToClipboard = () => {
    if (!data?.url) {
      throw new Error("cannot copy undefined one-time url")
    }

    navigator.clipboard
      .writeText(data.url)
      .then(() => toast.success("Copied to clipboard.", { id: "clipboard" }))
  }

  const handleFormReset = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setSecret("")
    setCopyButtonVisible(false)
    clear()
  }

  const handleSubmit = async () => {
    if (secret.trim().length === 0) {
      return toast.error("Type or paste a secret below", {
        id: "warning",
        icon: "🤫",
      })
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
        <Box className={clsx("animate__animated", "animate__fadeInUp")}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={copyToClipboard}
            startIcon={<CopyOutlineIcon />}
          >
            Copy One-time URL
          </Button>

          <Box py={2}>
            <Link
              href="/ots"
              onClick={handleFormReset}
              underline="hover"
              sx={{
                color: "info.main",
                fontSize: theme.typography.pxToRem(18),
              }}
            >
              Share a new secret
            </Link>
          </Box>
        </Box>
      )}
    </>
  )

  const showInputTerminal = () => (
    <Terminal
      disableGutters
      inputProps={{
        sx: {
          px: 3,
        },
        placeholder: "→ Type or paste what you want to securely share here...",
        onChange: (e) => setSecret(e.target.value),
        value: secret,
        maxLength: 2048,
        autoFocus: true,
      }}
      footer={
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          sx={{
            ...(secret.length === maxSecretLength && { color: "error.main" }),
          }}
        >
          {secret.length === maxSecretLength && (
            <AlertCircleOutlineIcon width={16} height={16} />
          )}
          <span>
            {secret.length} / {maxSecretLength}
          </span>
        </Stack>
      }
      footerTooltip={`Secret character length limit`}
    />
  )

  return (
    <Container>
      <Toaster
        toastOptions={{
          style: {
            background: theme.palette.grey[800],
            color: theme.palette.common.white,
            fontSize: 18,
          },
        }}
      />

      <Box py={14.6} textAlign="center">
        <Typography variant="h1" shaded>
          Share end-to-end encrypted secrets with others via a one-time URL
        </Typography>

        <Box py={3.5} color="info.main" maxWidth={1024} margin="0 auto">
          <Typography variant="h5">
            Use to securely share sensitive secrets such as API keys, signing
            secrets, passwords and more with 3rd parties or with your team.
            Secrets are destroyed 💥 once viewed, or after specified expiry
          </Typography>
        </Box>

        <Box maxWidth={860} margin="0 auto">
          {data?.url
            ? showOneTimeSecretTerminal(data)
            : loading
            ? showLoadingTerminal()
            : showInputTerminal()}

          <Box
            className={clsx(
              "animate__animated",
              "animate__fadeInUp",
              (loading || data?.url) && "animate__fadeOutDown",
            )}
          >
            <Box mb={2}>
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  expandIcon={<ChevronDownIcon />}
                >
                  <Typography>Show more options</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Box
                    display="flex"
                    width="100%"
                    textAlign="left"
                    flexWrap="wrap"
                    px={3}
                  >
                    <Box display="flex" flex={1} pb={4}>
                      <FormControl component="fieldset" focused={false}>
                        <FormLabel component="legend">
                          Select a region to store your one-time secret
                        </FormLabel>

                        <RadioGroup
                          row
                          aria-label="position"
                          name="position"
                          defaultValue={defaultRegion}
                          onChange={(e) => setRegion(e.target.value as Region)}
                        >
                          <FormControlLabel
                            value="us-east-1"
                            control={<Radio color="primary" />}
                            label="North America"
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            value="eu-central-1"
                            control={<Radio color="primary" />}
                            label="Europe"
                            labelPlacement="end"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Box>

                    <Box display="flex" flex={1}>
                      <Box flex={1} px={2}>
                        <FormLabel>
                          Custom secret expiry length (days)
                        </FormLabel>
                        <Slider
                          defaultValue={1}
                          getAriaValueText={(value: number) => `${value} days`}
                          aria-labelledby="expiresIn-slider"
                          step={1}
                          min={1}
                          max={7}
                          valueLabelDisplay="auto"
                          marks={[
                            { value: 1, label: "1 day" },
                            { value: 7, label: "7 days" },
                          ]}
                          onChange={(_event, newValue) => {
                            const days = newValue as number
                            const customExpiresIn =
                              days * defaultExpiryInSeconds

                            setExpiresIn(customExpiresIn)
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
              disabled={loading}
              fullWidth
              startIcon={<ShieldIcon />}
            >
              {loading
                ? "Creating one-time secret link..."
                : "Encrypt and create one-time link"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
