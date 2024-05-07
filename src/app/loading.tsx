import { Center, Spinner, Stack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center h="100%" w="100%">
      <Spinner size="xl" color="brand.primary" />
    </Center>
  );
}
