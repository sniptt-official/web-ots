import { ChakraProps } from "@chakra-ui/react"
import React from "react"

export type TerminalProps = {
  disableGutters?: boolean
  footer?: React.ReactElement<any, any> & React.ReactNode
  footerTooltip?: string
  hideHeader?: boolean
  lines?: Array<Line>
  inputProps?: React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > &
    ChakraProps
} & ChakraProps

export type Line = {
  id?: number
  cmd: boolean
  current?: boolean
  delay?: number
  frames?: Array<Partial<Line>>
  prefix?: string
  repeat?: boolean
  repeatCount?: number
  text: string | React.ReactNode
}

export interface AnimatedTerminalProps extends TerminalProps {
  terminalLines: Array<Line>
  interval: number
  className?: string
  hideHeader?: boolean
  onComplete?: () => void
}

export type AnimatedTerminalState = {
  lines: Array<Line>
  completed: boolean
}
