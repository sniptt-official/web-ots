import {
  Box,
  chakra,
  Flex,
  HStack,
  HTMLChakraProps,
  Icon,
  IconButton,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import { useViewportScroll } from "framer-motion"
import NextLink from "next/link"
import { useEffect, useRef, useState } from "react"
import { FaMoon, FaSun } from "react-icons/fa"

import Logo from "~/components/Logo"
import siteConfig from "~/config"

import GithubIcon from "./icons/GithubIcon"
import SearchBar from "./SearchBar"

function HeaderContent() {
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <>
      <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
        <Flex align="center">
          <NextLink href="/" passHref>
            <chakra.a display="block" aria-label="Sniptt, Back to homepage">
              <Logo />
            </chakra.a>
          </NextLink>
        </Flex>

        <Flex justify="flex-end" align="center" color="gray.400" maxW="1100">
          <HStack spacing="5" display={{ base: "none", md: "flex" }}>
            <Link
              isExternal
              aria-label="Go to Chakra UI GitHub page"
              href={siteConfig.repo.url}
            >
              <Icon
                as={GithubIcon}
                display="block"
                transition="color 0.2s"
                w="5"
                h="5"
                _hover={{ color: "gray.600" }}
              />
            </Link>
          </HStack>

          <IconButton
            size="md"
            fontSize="lg"
            aria-label={`Switch to ${text} mode`}
            variant="ghost"
            color="current"
            ml={{ base: "0", md: "3" }}
            onClick={toggleMode}
            icon={<SwitchIcon />}
          />

          <SearchBar />
        </Flex>
      </Flex>
    </>
  )
}

function Header(props: HTMLChakraProps<"header">) {
  const bg = useColorModeValue("white", "gray.800")
  const ref = useRef<HTMLElement>(null)
  const [y, setY] = useState(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  const { scrollY } = useViewportScroll()

  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  return (
    <chakra.header
      ref={ref}
      shadow={y > height ? "sm" : undefined}
      transition="box-shadow 0.2s, background-color 0.2s"
      pos="sticky"
      top="0"
      zIndex="3"
      bg={bg}
      left="0"
      right="0"
      width="full"
      {...props}
    >
      <Box height="4.5rem" mx="auto" maxW="8xl">
        <HeaderContent />
      </Box>
    </chakra.header>
  )
}

export default Header
