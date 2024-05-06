"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import {
  RoomProvider,
  useOthers,
  useSelf,
} from "../../../../../../liveblocks.config";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Center,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { ForwordEditor } from "@/components";

const Loading = () => {
  return (
    <Center w="100%" h="100%">
      <Spinner size="xl" color="brand.primary" />
    </Center>
  );
};

export default function Page() {
  return (
    <RoomProvider id="forword-room" initialPresence={{}}>
      <Center w="100%" h="100vh">
        <ClientSideSuspense fallback={<Loading />}>
          {() => <ForwordEditor />}
        </ClientSideSuspense>
      </Center>
    </RoomProvider>
  );
}
