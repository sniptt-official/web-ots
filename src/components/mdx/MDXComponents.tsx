import * as Chakra from "@chakra-ui/react"
import { BoxProps, HTMLChakraProps, useColorModeValue } from "@chakra-ui/react"
import * as React from "react"

import CodeBlock from "./CodeBlock"
import LinkedHeading from "./LinkedHeading"

const { Alert, Box, chakra, Kbd } = Chakra

const Anchor = React.forwardRef((props: any, ref: any) => (
  <chakra.a ref={ref} apply="mdx.a" {...props} />
))

const BlockQuote = (props: HTMLChakraProps<"blockquote">) => (
  <Alert
    mt="4"
    role="none"
    status="warning"
    variant="left-accent"
    as="blockquote"
    rounded="4px"
    my="1.5rem"
    {...props}
  />
)

const Heading1 = (props: HTMLChakraProps<"h1">) => (
  <chakra.h1 apply="mdx.h1" {...props} />
)

const Heading2 = (props: HTMLChakraProps<"h2">) => (
  <LinkedHeading apply="mdx.h2" {...props} />
)

const Heading3 = (props: HTMLChakraProps<"h3">) => (
  <LinkedHeading as="h3" apply="mdx.h3" {...props} />
)

const Heading4 = (props: HTMLChakraProps<"h4">) => (
  <LinkedHeading as="h4" apply="mdx.h4" {...props} />
)

const HorizontalLine = (props: HTMLChakraProps<"hr">) => (
  <chakra.hr apply="mdx.hr" {...props} />
)

const LineBreak = ({ reset, ...props }: BoxProps & { reset?: boolean }) => (
  <Box
    as={reset ? "br" : undefined}
    height={reset ? undefined : "24px"}
    {...props}
  />
)

const ListItem = (props: HTMLChakraProps<"li">) => (
  <chakra.li pb="4px" {...props} />
)

const InlineCode = (props: HTMLChakraProps<"code">) => (
  <chakra.code
    apply="mdx.code"
    color={useColorModeValue("purple.500", "purple.200")}
    {...props}
  />
)

const OrderedList = (props: HTMLChakraProps<"ol">) => (
  <chakra.ol apply="mdx.ul" {...props} />
)

const Paragraph = (props: HTMLChakraProps<"p">) => (
  <chakra.p apply="mdx.p" {...props} />
)

const Pre = (props: HTMLChakraProps<"pre">) => (
  <chakra.pre my="2em" borderRadius="sm" {...props} />
)

const Strong = (props: HTMLChakraProps<"strong">) => (
  <Box as="strong" fontWeight="semibold" {...props} />
)

const UnorderedList = (props: HTMLChakraProps<"ul">) => (
  <chakra.ul apply="mdx.ul" {...props} />
)

const Table = (props: HTMLChakraProps<"div">) => (
  <chakra.div overflowX="auto">
    <chakra.table textAlign="left" mt="32px" width="full" {...props} />
  </chakra.div>
)

const THead = (props: HTMLChakraProps<"th">) => (
  <chakra.th
    bg={useColorModeValue("gray.50", "whiteAlpha.100")}
    fontWeight="semibold"
    p={2}
    fontSize="sm"
    {...props}
  />
)

const TData = (props: HTMLChakraProps<"td">) => (
  <chakra.td
    p={2}
    borderTopWidth="1px"
    borderColor="inherit"
    fontSize="sm"
    whiteSpace="normal"
    {...props}
  />
)

const MDXComponents = {
  ...Chakra,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  hr: HorizontalLine,
  strong: Strong,
  inlineCode: InlineCode,
  code: CodeBlock,
  pre: Pre,
  kbd: Kbd,
  br: LineBreak,
  table: Table,
  th: THead,
  td: TData,
  a: Anchor,
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  blockquote: BlockQuote,
}

export default MDXComponents
