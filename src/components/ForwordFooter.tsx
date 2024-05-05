import { Heading, Stack, Text } from "@chakra-ui/react";

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
        <Text>Contact Us</Text>
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
