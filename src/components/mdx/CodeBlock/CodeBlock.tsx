import { Box, SystemStyleObject } from "@chakra-ui/react"
import { Language } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/nightOwl"
import React from "react"

import CopyButton from "./CopyButton"
import Highlight from "./Highlight"

interface CodeBlockProps {
  className: string
  viewlines?: boolean
  hideCopyButton?: boolean
  ln?: string
  sx?: SystemStyleObject
}

function CodeBlock(props: React.PropsWithChildren<CodeBlockProps>) {
  const {
    className,
    children,
    viewlines,
    ln,
    sx,
    hideCopyButton = false,
  } = props

  if (!children || typeof children !== "string") {
    throw new Error("CodeBlock missing raw code string")
  }

  const language = className?.replace(/language-/, "") as Language
  const rawCode = children.trim()

  return (
    <Box position="relative" zIndex="0" my="8">
      <Highlight
        codeString={rawCode}
        language={language}
        theme={theme}
        metastring={ln}
        showLines={viewlines}
        sx={sx}
      />
      <CopyButton top="6" code={rawCode} hidden={hideCopyButton} />
    </Box>
  )
}

export default CodeBlock
