import {
  Box,
  Button,
  chakra,
  Container,
  Flex,
  ListItem,
  Spacer,
  Stack,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react"
import NextLink from "next/link"
import React from "react"
import { DiGithubBadge } from "react-icons/di"

import Logo from "~/components/Logo"
import siteConfig from "~/config"

type LinkItem = {
  label: string
  href?: string
  to?: string
}

const Footer = () => {
  const {
    repo,
    tagline,
    footer: { links },
  } = siteConfig

  const linkColor = useColorModeValue("gray.600", "gray.400")
  const linkHoverColor = useColorModeValue("gray.900", "gray.600")

  return (
    <Box as="footer" bg={useColorModeValue("gray.50", "gray.700")}>
      <Container maxW="7xl">
        <Box py={["2rem", "3rem", "6rem"]} textAlign={["center", "left"]}>
          <Stack
            direction={["column-reverse", "column-reverse", "row"]}
            spacing="24px"
          >
            <Box flex="1">
              <Logo height="6" />
              <Text pt="6" pb="3">
                {tagline}
              </Text>
              <Button
                as="a"
                size="md"
                href={repo.url}
                target="__blank"
                leftIcon={<DiGithubBadge size="1.5em" />}
              >
                Star us on Github
              </Button>
            </Box>

            <Box flex="2">
              <Stack direction={["column", "row"]}>
                {links.map((linkSection, i) => (
                  <UnorderedList key={i} styleType="none" m="0" flex="1" px="4">
                    <ListItem fontWeight="bold" mb="4">
                      {linkSection.title}
                    </ListItem>

                    {linkSection.items.map((item: LinkItem, i) => (
                      <NextLink
                        key={i}
                        href={item.to ? item.to : item.href ?? ""}
                        passHref
                      >
                        <chakra.a
                          my="3"
                          display="block"
                          color={linkColor}
                          _hover={{ color: linkHoverColor }}
                          {...(item.href && {
                            rel: "noopener noreferrer",
                            target: "_blank",
                          })}
                        >
                          {item.label}
                        </chakra.a>
                      </NextLink>
                    ))}
                  </UnorderedList>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Container>

      <Box
        display="flex"
        height="86px"
        borderTop="1px"
        justifyContent="center"
        alignItems="center"
        borderColor={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      >
        <Container maxW="7xl">
          <Flex>
            <Text color="gray.500">
              Made with 💜&nbsp;&nbsp;by <strong>Sniptt</strong> team
            </Text>

            <Spacer />

            <Text color="gray.500" textAlign="right">
              &copy; Sniptt. All Rights Reserved.
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

export default Footer
