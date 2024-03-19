"use client";

import { Providers } from "@/components";
import { RoomProvider } from "../../../liveblocks.config";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoomProvider id="forword-room" initialPresence={{}}>
      {children}
    </RoomProvider>
  );
}
