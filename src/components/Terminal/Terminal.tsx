import { Box, HStack, Text, Textarea } from "@chakra-ui/react"
import React from "react"

import LockClosedIcon from "../icons/LockClosedIcon"
import type { TerminalProps } from "./types"

const TerminalHeader = () => (
  <Box
    position="relative"
    display="flex"
    py="3"
    px="4"
    color="whiteAlpha.600"
    userSelect="none"
    sx={{ WebkitUserSelect: "none" }}
  >
    <Box
      as="span"
      fontSize="3xl"
      position="absolute"
      left="16px"
      lineHeight="14px"
      verticalAlign="middle"
    >
      •••
    </Box>

    <HStack
      as="span"
      flex="1"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      fontSize="xs"
      color="whiteAlpha.600"
      verticalAlign="middle"
    >
      <LockClosedIcon />
      <Text as="span">End-to-end encrypted</Text>
    </HStack>
  </Box>
)

const Terminal = ({
  footer,
  footerTooltip,
  hideHeader,
  inputProps,
  lines,
  disableGutters = false,
  sx,
}: TerminalProps): JSX.Element => {
  const showCursor = (
    <Box
      as="span"
      display="inline-block"
      width="6px"
      height="15px"
      bg="white"
      verticalAlign="middle"
      sx={{
        animation: "BlinkingCursor 0.75s linear infinite",
        animationTimingFunction: "steps(1)",
      }}
    />
  )

  const prompt = (basePath = "dev") => (
    <Box as="span" fontWeight="bold">
      <Box as="span" color="#ea4aaa">
        →&nbsp;
      </Box>
      <Box as="span" color="green.500">
        ~/{basePath}&nbsp;
      </Box>
    </Box>
  )

  return (
    <Box display="flex" justifyContent="center" sx={sx}>
      <Box
        borderRadius="8"
        bg="#011627"
        boxShadow="0 0 0 1px hsl(0deg 0% 100% / 10%), 0 4px 24px #040d21"
        my="3"
        height="400"
        flex="1"
      >
        {!hideHeader && <TerminalHeader />}

        <Box
          px={disableGutters ? 0 : 6}
          m="0"
          textAlign="left"
          height="calc(100% - 47px)"
          overflow="auto"
          whiteSpace="pre-line"
          fontFamily="mono"
          {...(footer && {
            height: "calc(100% - 92px)",
          })}
        >
          {lines?.map((line) => (
            <React.Fragment key={line.id}>
              {line.cmd ? prompt() : ""}
              {line.prefix && (
                <Box component="span" color="rgba(255, 255, 255, 0.4)">
                  {line.prefix}&nbsp;
                </Box>
              )}

              <Text as="span" color="white">
                {line.text}
              </Text>
              {line.current ? showCursor : ""}
              <br />
            </React.Fragment>
          ))}
          {inputProps && (
            <Textarea
              h="100%"
              spellCheck={false}
              resize="none"
              color="white"
              focusBorderColor="none"
              border="none"
              whiteSpace="pre-wrap"
              {...inputProps}
            />
          )}
        </Box>

        {footer && (
          <HStack
            justifyContent="flex-end"
            fontFamily="mono"
            fontSize="sm"
            py="3"
            px={{ base: 4, sm: 6 }}
            color="whiteAlpha.600"
          >
            {footer && (
              <Box sx={{ cursor: "default" }}>
                {footerTooltip ? footer : footer}
              </Box>
            )}
          </HStack>
        )}
      </Box>
    </Box>
  )
}

export default Terminal
