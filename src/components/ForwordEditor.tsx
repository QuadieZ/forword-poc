"use client";

import * as Y from "yjs";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { useRoom } from "../../liveblocks.config";
import { useEffect, useState } from "react";
import LiveblocksProvider from "@liveblocks/yjs";
import { Button, Stack } from "@chakra-ui/react";

const colors = [
  "#59D5E0",
  "#F5DD61",
  "#FAA300",
  "#F4538A",
  "#5356FF",
  "#9BB0C1",
  "#51829B",
];

type EditorProps = {
  document: Y.Doc;
  provider: any;
};

function TipTapEditor(props: EditorProps) {
  const { document, provider } = props;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false, // handled by extension
      }),
      Collaboration.configure({
        document,
      }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: "Anonymous Unicorn",
          color: colors[Math.floor(Math.random() * colors.length)],
        },
      }),
    ],
  });

  return <EditorContent editor={editor} className="ProseMirror" />;
}

export const ForwordEditor = () => {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return (
    <Stack
      borderRadius="md"
      bg="whitesmoke"
      h="100%"
      w="100%"
      overflowY="scroll"
      p={8}
      pos="relative"
    >
      <Button
        bottom={0}
        marginLeft="auto"
        marginRight="auto"
        pos="absolute"
        display="block"
      >
        Save
      </Button>
      <TipTapEditor document={doc} provider={provider} />
    </Stack>
  );
};
