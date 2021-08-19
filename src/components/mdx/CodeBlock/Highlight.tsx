import { chakra, SystemStyleObject } from "@chakra-ui/react"
import BaseHighlight, {
  defaultProps,
  Language,
  PrismTheme,
} from "prism-react-renderer"
import React from "react"

interface HighlightProps {
  codeString: string
  language: Language
  theme: PrismTheme
  metastring?: string
  showLines?: boolean
  sx?: SystemStyleObject
}

function Highlight(props: HighlightProps) {
  const { codeString, language, showLines, sx, ...otherProps } = props

  return (
    <BaseHighlight
      {...defaultProps}
      code={codeString}
      language={language}
      {...otherProps}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <chakra.div
          fontSize="15"
          overflowX="auto"
          fontFamily="mono"
          data-language={language}
        >
          <chakra.pre
            position="relative"
            pt="6"
            pb="5"
            px="2"
            rounded="8px"
            overflowX="scroll"
            className={className}
            style={style}
            sx={sx}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i })

              return (
                <chakra.div key={i} px="5" {...lineProps}>
                  {showLines && (
                    <chakra.span opacity={0.3} mr="6" fontSize="xs">
                      {i + 1}
                    </chakra.span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </chakra.div>
              )
            })}
          </chakra.pre>
        </chakra.div>
      )}
    </BaseHighlight>
  )
}

export default Highlight
