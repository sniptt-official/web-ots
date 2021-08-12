import { useTheme } from "@material-ui/core"
import Box from "@material-ui/core/Box"
import Stack from "@material-ui/core/Stack"
import { styled } from "@material-ui/core/styles"
import Tooltip, {
  tooltipClasses,
  TooltipProps,
} from "@material-ui/core/Tooltip"
import React from "react"

import LockClosedIcon from "~/components/icons/LockClosed"

import type { TerminalProps } from "./types"

const Console = styled("textarea")(({ theme }) => ({
  margin: 0,
  width: "100%",
  height: "95%",
  boxSizing: "border-box",

  fontFamily: theme.typography.monospaceFontFamily,
  fontSize: 16,
  lineHeight: 1.8,
  color: theme.palette.common.white,

  userSelect: "text",
  WebkitUserSelect: "text",
  resize: "none",
  background: "transparent",
  border: "none",
  whiteSpace: "pre-wrap",
  outline: "none",
}))

const Terminal = ({
  footer,
  footerTooltip,
  hideHeader,
  inputProps,
  lines,
  disableGutters = false,
}: TerminalProps): JSX.Element => {
  const theme = useTheme()

  const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "white",
      color: "black",
      fontSize: theme.typography.pxToRem(14),
      maxWidth: 500,
    },
  }))

  const showCursor = (
    <Box
      component="span"
      sx={{
        display: "inline-block",
        width: "6px",
        height: "15px",
        bgcolor: "white",
        verticalAlign: "middle",
        animation: "BlinkingCursor 0.75s linear infinite",
        animationTimingFunction: "steps(1)",
      }}
    />
  )

  const prompt = (basePath = "dev") => (
    <Box component="span" sx={{ fontWeight: 600 }}>
      <Box component="span" sx={{ color: "#ea4aaa" }}>
        →&nbsp;
      </Box>
      <Box component="span" sx={{ color: "#0dbc79" }}>
        ~/{basePath}&nbsp;
      </Box>
    </Box>
  )

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          borderRadius: Number(theme.shape.borderRadius) / 4,
          bgcolor: "background.dark",
          boxShadow: "0 0 0 1px hsl(0deg 0% 100% / 10%), 0 4px 24px #040d21",
          my: 3,
          height: 400,
          flex: 1,
        }}
      >
        {!hideHeader && (
          <Box
            sx={{
              position: "relative",
              display: "flex",
              py: 1.5,
              px: 2,
              color: "hsla(0, 0%, 100%, 0.3)",
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
          >
            <Box
              component="span"
              sx={{
                fontSize: 42,
                lineHeight: "10px",
                letterSpacing: 3,
                position: "absolute",
                left: 16,
                top: 12,
              }}
            >
              •••
            </Box>

            <StyledTooltip
              title={
                <>
                  <strong>
                    Encryption and decryption is performed in the browser.
                  </strong>
                  <br />
                  Your encryption key is encoded in the one-time URL, and never
                  leaves your browser.
                </>
              }
              placement="top"
            >
              <Box
                component="span"
                sx={{
                  flex: 1,
                  color: "white",
                  textAlign: "center",
                  fontSize: 14,
                  opacity: 0.64,
                }}
              >
                <LockClosedIcon width={12} height={12} /> End-to-end encrypted
              </Box>
            </StyledTooltip>
          </Box>
        )}

        <Box
          sx={{
            px: disableGutters ? 0 : 3,
            m: 0,
            textAlign: "left",
            height: "calc(100% - 47px)",
            overflow: "auto",
            whiteSpace: "pre-line",
            fontFamily: theme.typography.monospaceFontFamily,
            ...(footer && {
              height: "calc(100% - 92px)",
            }),
          }}
        >
          {lines?.map((line) => (
            <React.Fragment key={line.id}>
              {line.cmd ? prompt() : ""}
              {line.prefix && (
                <Box component="span" color="rgba(255, 255, 255, 0.4)">
                  {line.prefix}&nbsp;
                </Box>
              )}
              {line.text}
              {line.current ? showCursor : ""}
              <br />
            </React.Fragment>
          ))}

          {inputProps && <Console spellCheck={false} {...inputProps} />}
        </Box>

        {footer && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              color: "hsla(0, 0%, 100%, 0.64)",
              py: 1.5,
              px: 2,
              fontSize: 14,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {/* <Link
                href="https://github.com/sniptt-official/ots-web"
                target="_blank"
                rel="noopener noreferral"
                underline="hover"
              >
                <ShieldIcon width={12} height={12} />
                &nbsp; Inspect source code on Github
              </Link> */}
            </Stack>

            {footer && (
              <Box sx={{ cursor: "default" }}>
                {footerTooltip ? (
                  <StyledTooltip title={footerTooltip} placement="top">
                    {footer}
                  </StyledTooltip>
                ) : (
                  footer
                )}
              </Box>
            )}
          </Stack>
        )}
      </Box>
    </Box>
  )
}

export default Terminal
