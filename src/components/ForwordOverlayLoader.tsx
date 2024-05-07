import { Center, Spinner } from "@chakra-ui/react";

export const ForwordOverlayLoader = () => {
  return (
    <Center
      w="100vw"
      h="100vh"
      pos="absolute"
      top={0}
      right={0}
      bg="rgba(0,0,0,0.6)"
      zIndex={100}
    >
      <Spinner size="xl" color="brand.contrast" />
    </Center>
  );
};
