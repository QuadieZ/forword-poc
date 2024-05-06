import { ForwordButton, ForwordFooter, ForwordLink } from "@/components";
import { HStack, Heading, Image, Stack, Text } from "@chakra-ui/react";

const WelcomeNavbar = () => {
  return (
    <HStack justify="space-between" w="100%" h="12vh" px={12} align="center">
      <Heading as="h2" fontSize="xl">
        Forword
      </Heading>
      <ForwordLink href="/">
        <ForwordButton display={["none", "flex", "flex", "flex"]}>
          Try Forword Now
        </ForwordButton>
      </ForwordLink>
    </HStack>
  );
};

export default function Page() {
  return (
    <Stack h="100%" w="100%">
      <WelcomeNavbar />
      <Stack
        w="100%"
        flex={1}
        flexDir={["column", "row"]}
        px={[12, 12, 16, 24]}
        pb={8}
        gap={[8, 0]}
        align="center"
      >
        <Stack
          flex={0.4}
          w="100%"
          h="100%"
          justify="center"
          display={["flex", "none"]}
        >
          <Image
            src="/forword.png"
            alt="Welcome"
            w="100%"
            h="100%"
            objectFit="cover"
            objectPosition="center"
          />
        </Stack>
        <Stack flex={0.6} pr={[0, 12, 12, 32]} gap={4}>
          <Heading>Create Better, Together</Heading>
          <Text>
            Forword is a realtime collaborative blogging platform to help you
            discover, create, and share blogs with ease
          </Text>
          <ForwordLink href="/auth/signup" w="fit-content">
            <ForwordButton>Get Started</ForwordButton>
          </ForwordLink>
        </Stack>
        <Stack
          flex={0.4}
          w="100%"
          h="100%"
          py={24}
          justify="center"
          display={["none", "flex"]}
        >
          <Image
            src="/forword.png"
            alt="Welcome"
            w="100%"
            h="100%"
            objectFit="cover"
            objectPosition="center"
          />
        </Stack>
      </Stack>
      <ForwordFooter />
    </Stack>
  );
}
