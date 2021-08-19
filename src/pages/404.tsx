import { Button, chakra, Heading, Text, VStack } from "@chakra-ui/react"
import NextLink from "next/link"
import * as React from "react"

import AnnouncementBar from "~/components/AnnouncementBar"
import Footer from "~/components/Footer"
import Header from "~/components/Header"
import Seo from "~/components/Seo"
import siteConfig from "~/config"

const NotFoundPage = () => {
  return (
    <>
      <Seo title="404: Not found" description="Page not found" />

      <AnnouncementBar
        text={siteConfig.announcementBar.text}
        url={siteConfig.announcementBar.url}
      />

      <Header />

      <chakra.div as="main">
        <VStack
          justify="center"
          spacing="4"
          as="section"
          mt={["20", null, "40"]}
          textAlign="center"
        >
          <Heading>404 | Page Not Found</Heading>

          <Text fontSize={{ md: "xl" }}>We wish this existed too 🥲</Text>

          <NextLink href="/" passHref>
            <Button
              as="a"
              aria-label="Back to Home"
              colorScheme="teal"
              size="md"
            >
              Back to Reality
            </Button>
          </NextLink>
        </VStack>
      </chakra.div>

      <Footer />
    </>
  )
}

export default NotFoundPage
