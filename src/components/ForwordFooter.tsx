import { Heading, Stack, Text } from "@chakra-ui/react";
import { ForwordLink } from "./ForwordLink";

export const ForwordFooter = () => {
  return (
    <Stack
      w="100%"
      h="25vh"
      bg="brand.secondary"
      px={[8, 12]}
      py={8}
      flexDir={"row"}
      justify="space-between"
    >
      <Stack flex={1}>
        <Heading as="h2" fontWeight="500" fontSize="lg">
          Forword
        </Heading>
        <Text fontSize="sm" fontWeight={300}>
          Your go-to collaborative blogging platform
        </Text>
      </Stack>
      <Stack align="flex-end">
        <Text fontWeight={300} fontSize="sm">
          Get Assistance
        </Text>
        <ForwordLink
          isExternal
          href="mailto:lifeat.deva@gmail.com?subject=Forword: Request assistance"
        >
          Contact Us
        </ForwordLink>
      </Stack>
      <Heading
        as="h2"
        fontWeight="500"
        fontSize="md"
        pos="absolute"
        bottom={[5, 10]}
      >
        Forword @2024
      </Heading>
    </Stack>
  );
};
