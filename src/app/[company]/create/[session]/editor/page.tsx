"use client";

import { ForwordEditor } from "@/components";
import { useUserStore } from "@/state";
import { Center, Spinner } from "@chakra-ui/react";
import { Liveblocks } from "@liveblocks/node";
import { ClientSideSuspense } from "@liveblocks/react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RoomProvider } from "../../../../../../liveblocks.config";

const liveblocks = new Liveblocks({
  secret: process.env.NEXT_PUBLIC_PV_LIVEBLOCKS_KEY!,
});

const Loading = () => {
  return (
    <Center w="100%" h="100%">
      <Spinner size="xl" color="brand.primary" />
    </Center>
  );
};

const colors = [
  "#59D5E0",
  "#F5DD61",
  "#FAA300",
  "#F4538A",
  "#5356FF",
  "#9BB0C1",
  "#51829B",
];

const currentColor = colors[Math.floor(Math.random() * colors.length)];

export default function Page() {
  const { session: sessionId, company } = useParams<{
    session: string;
    company: string;
  }>();

  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user && user?.user_id && !hasFetched && sessionId) {
      console.log("hey", user?.user_id, !hasFetched);
      setHasFetched(true);
      axios({
        method: "POST",
        url: "/api/liveblock-auth",
        data: {
          userId: user?.user_id,
          sessionId,
        },
      })
        .then((res) => {
          console.log("resp", res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <RoomProvider id={`${company}:${sessionId}`} initialPresence={{}}>
      <Center w="100%" h="100vh">
        <ClientSideSuspense fallback={<Loading />}>
          {() => <ForwordEditor />}
        </ClientSideSuspense>
      </Center>
    </RoomProvider>
  );
}
