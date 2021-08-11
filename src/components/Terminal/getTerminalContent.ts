/**
 * All credit for animated terminal goes to `react-animated-term`
 * See https://github.com/dongy7/react-animated-term.
 */
import { Line } from "./types"

const getTerminalContent = function* (lines: Array<Line>) {
  if (lines.length === 0) {
    return []
  }

  let lineIndex = 0
  let linePosition = 0
  let cmdTimer: ReturnType<typeof setTimeout> | null = null
  let frameIndex = 0
  let frameTimer: ReturnType<typeof setTimeout> | null = null
  let frameRepeatCounter = 0

  // The current contents of the terminal.
  const buffer: Array<Line> = []

  while (true) {
    if (lineIndex < lines.length) {
      const currentLine = lines[lineIndex]

      // Next line is an output line.
      if (!currentLine.cmd) {
        const frames = currentLine.frames

        // A static line, add it to buffer and move to next line.
        if (!frames) {
          buffer.push({
            id: lineIndex,
            prefix: currentLine.prefix,
            text: currentLine.text,
            cmd: false,
            current: false,
          })

          yield buffer
          linePosition = 0
          lineIndex++
        } else if (frameIndex < frames.length) {
          // This is the first frame.
          if (frameIndex === 0) {
            // Push the line's frame onto buffer only if this is the first time
            // rendering this line.
            if (!frameTimer && frameRepeatCounter === 0) {
              buffer.push({
                id: lineIndex,
                prefix: frames[0].prefix,
                text: frames[0].text,
                cmd: false,
                current: true,
              })
            }
          }

          // Show the current frame's text.
          const currentFrame = frames[frameIndex]

          buffer[lineIndex].text = currentFrame.text

          // Start a timer to render the next frame only after the delay.
          if (!frameTimer) {
            if (currentFrame.delay) {
              frameTimer = setTimeout(() => {
                frameTimer = null
                frameIndex++
              }, currentFrame.delay)

              // Yield here to avoid condition where frameIndex goes out of bounds from the timeout.
              yield buffer
            } else {
              frameIndex++
            }
          }
        } else {
          const { repeat, repeatCount } = currentLine

          // If current line should be repeated, reset frame counter and index.
          if (repeat && repeatCount && frameRepeatCounter < repeatCount) {
            frameRepeatCounter++
            frameIndex = 0
          } else {
            // If final frame specified, use it as the text.
            if (currentLine.text) {
              buffer[lineIndex].text = currentLine.text
            }

            // Move to next line.
            buffer[lineIndex].current = false
            linePosition = 0
            frameIndex = 0
            lineIndex++
          }
        }
      } else if (
        typeof currentLine.text === "string" &&
        linePosition > currentLine.text.length
      ) {
        // Move to next line.
        // If the line is the last line, current set to true to render cursor.
        buffer[lineIndex].current = lineIndex === lines.length - 1
        linePosition = 0
        lineIndex++
      } else {
        if (linePosition === 0 && !cmdTimer) {
          buffer.push({
            id: lineIndex,
            text: "",
            cmd: currentLine.cmd,
            current: true,
          })
        }

        // Set text for the line as all the text before or at the position.
        if (typeof currentLine.text === "string") {
          buffer[lineIndex].text = currentLine.text.substring(0, linePosition)
        }

        // Only move to next line position if no delay specified
        // or timer for current position has expired.
        if (cmdTimer == null) {
          const delay = currentLine.delay

          if (delay) {
            cmdTimer = setTimeout(() => {
              cmdTimer = null
              linePosition++
            }, delay)
          } else {
            linePosition++
          }
        }
      }

      yield buffer
    } else {
      // No more lines to process.
      // Signal finished to allow renderer to stop querying for new terminal content.
      return buffer
    }
  }
}

export default getTerminalContent
