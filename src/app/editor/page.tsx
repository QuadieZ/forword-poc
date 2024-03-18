"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "../../../liveblocks.config";
import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import { ForwordEditor } from "@/components";

const Loading = () => {
  return (
    <Center w="100%" h="100%">
      <Spinner size="xl" color="#4CCD99" />
    </Center>
  );
};

export default function Page() {
  return (
    <Box
      bg="gray.200"
      pos="absolute"
      w="100vw"
      h="100vh"
      top={0}
      right={0}
      p={8}
    >
      <RoomProvider id="forword-room" initialPresence={{}}>
        <ClientSideSuspense fallback={<Loading />}>
          {() => <ForwordEditor />}
        </ClientSideSuspense>
      </RoomProvider>
    </Box>
  );
}
