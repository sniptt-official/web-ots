/**
 * All credit for animated terminal goes to `react-animated-term`
 * See https://github.com/dongy7/react-animated-term.
 */
import React from "react"

import getTerminalContent from "./getTerminalContent"
import Terminal from "./Terminal"
import { AnimatedTerminalProps, AnimatedTerminalState, Line } from "./types"

export const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]

class AnimatedTerminal extends React.Component<
  AnimatedTerminalProps,
  AnimatedTerminalState
> {
  timer = 0
  content: Generator<Line[], Line[], unknown>

  static defaultProps = {
    interval: 100,
    lines: [],
  }

  constructor(props: AnimatedTerminalProps) {
    super(props)
    this.content = getTerminalContent(props.terminalLines)
    this.state = {
      lines: this.content.next().value,
      completed: false,
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const { value, done } = this.content.next()

      this.setState({
        lines: value,
      })

      if (done) {
        clearInterval(this.timer)
        this.setState({
          completed: true,
        })

        if (this.props.onComplete) {
          this.props.onComplete()
        }
      }
    }, this.props.interval) as any
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  replay() {
    const { interval, terminalLines } = this.props

    this.content = getTerminalContent(terminalLines)

    this.setState({
      completed: false,
    })

    this.timer = setInterval(() => {
      const { value, done } = this.content.next()

      this.setState({
        lines: value,
      })

      if (done) {
        clearInterval(this.timer)
        this.setState({
          completed: true,
        })
      }
    }, interval) as any
  }

  render() {
    return <Terminal {...this.props} lines={this.state.lines} />
  }
}

export default AnimatedTerminal
