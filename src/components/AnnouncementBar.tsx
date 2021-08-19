import { Center, chakra, Flex, Text } from "@chakra-ui/react"

interface AnnouncementBarProps {
  text: string
  url?: string
}

const AnnouncementBar = (props: AnnouncementBarProps) => {
  const { text, url } = props

  return (
    <Center
      py="2"
      px="3"
      bgGradient="linear(to-r, cyan.700, purple.500)"
      color="white"
      textAlign="center"
    >
      <Flex align="center" fontSize="sm">
        <Text fontWeight="medium" maxW={{ base: "32ch", md: "unset" }}>
          {text}
        </Text>
        {url && (
          <chakra.a
            flexShrink={0}
            href={url}
            ms="6"
            bg="blackAlpha.300"
            color="whiteAlpha.900"
            fontWeight="semibold"
            px="3"
            py="1"
            rounded="base"
          >
            Try now
          </chakra.a>
        )}
      </Flex>
    </Center>
  )
}

export default AnnouncementBar
