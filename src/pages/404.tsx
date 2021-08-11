import { Button, chakra, Heading, Text, VStack } from "@chakra-ui/react"
import NextLink from "next/link"

import Footer from "~/components/Footer"
import Header from "~/components/Header"
import Seo from "~/components/Seo"

const NotFoundPage = () => {
  return (
    <>
      <Seo title="404: Not found" description="Page not found" />

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
