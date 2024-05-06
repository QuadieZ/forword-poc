"use client";

import * as Y from "yjs";
import {
  useEditor,
  EditorContent,
  Editor,
  useCurrentEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import {
  useBroadcastEvent,
  useEventListener,
  useOthers,
  useRoom,
  useSelf,
} from "../../../liveblocks.config";
import { useEffect, useState } from "react";
import LiveblocksProvider from "@liveblocks/yjs";
import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
  Link,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { GoBold } from "react-icons/go";
import { LuItalic } from "react-icons/lu";
import { EditorIconButton } from ".";
import { FaCode } from "react-icons/fa6";
import NextLink from "next/link";
import { ForwordButton } from "../ForwordButton";
import { ForwordLink } from "../ForwordLink";
import { BsChevronBarLeft, BsChevronLeft } from "react-icons/bs";
import { useParams, useRouter } from "next/navigation";

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

type EditorProps = {
  document: Y.Doc;
  provider: any;
  setEditor: (editor: Editor | null) => void;
};

function TipTapEditor(props: EditorProps) {
  const { document, provider, setEditor } = props;

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
          color: currentColor,
        },
      }),
    ],
  });

  useEffect(() => {
    setEditor(editor);
  }, [editor]);

  return <EditorContent editor={editor} className="ProseMirror" />;
}

export const ForwordEditor = () => {
  const params = useParams<{ company: string }>();
  const room = useRoom();
  const broadcast = useBroadcastEvent();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();
  const [editor, setEditor] = useState<Editor | null>(null);
  const [title, setTitle] = useState<string>();

  const router = useRouter();
  const currentUser = useSelf();
  const users = useOthers();

  const isOwner = true; // TODO: check if current user is the owner of the blog
  const isSharable = true; // TODO: check if current user can share the blog

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

  useEventListener(({ event }: { event: any }) => {
    if (event.type === "title") {
      setTitle(event.title);
    }
  });

  if (!doc || !provider) {
    return null;
  }

  return (
    <Stack
      borderRadius="md"
      bg="whitesmoke"
      h="100vh"
      w="100%"
      overflowY="scroll"
      pos="relative"
      gap={4}
    >
      <HStack
        px={[8, 10, 10]}
        w="100%"
        h="10vh"
        justify="space-between"
        borderBottom="1px solid"
        borderColor="border.primary"
      >
        <Link
          href="/"
          as={NextLink}
          _hover={{ textDecor: "none" }}
          cursor="pointer"
        >
          <Heading as="h2" fontSize="xl">
            Forword
          </Heading>
        </Link>
        <HStack gap={4}>
          <AvatarGroup size="sm" max={2}>
            {currentUser && (
              <Avatar
                name={
                  currentUser.info
                    ? (currentUser.info as any).name
                    : "Anonymous Unicorn"
                }
                borderColor="brand.primary"
              />
            )}
            {users.map((user) => (
              <Avatar
                key={user.id as string}
                name={user.info ? (user.info as any).name : "Anonymous Unicorn"}
                borderColor={(user.presence as any).__yjs?.user?.color}
              />
            ))}
          </AvatarGroup>
          {isSharable && <ForwordButton variant="outline">Share</ForwordButton>}
          {isOwner && <ForwordButton>Publish</ForwordButton>}
        </HStack>
      </HStack>
      <Flex
        flexDir="column"
        py={12}
        px={48}
        mb={28}
        h="80vh"
        align="flex-start"
        overflowY="scroll"
      >
        <ForwordLink
          href={`/${params.company}`}
          mb={6}
          color="content.primary"
          fontSize="sm"
          flexDir="row"
          display="flex"
          alignItems="center"
          gap={2}
        >
          <BsChevronLeft />
          Leave Session
        </ForwordLink>
        <Input
          fontSize="3xl"
          border="none"
          _active={{ border: "none" }}
          _focus={{ border: "none", boxShadow: "none" }}
          p={0}
          placeholder="New Blog Title..."
          fontWeight={700}
          _placeholder={{
            color: "gray.400",
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => {
            if (title && title.length > 0) {
              console.log(title);
              broadcast({ type: "title", title });
            }
          }}
          mb={4}
        />
        <Divider borderColor="border.primary" mb={8} mt={2} />
        <TipTapEditor
          document={doc}
          provider={provider}
          setEditor={setEditor}
        />
        <HStack
          pos="fixed"
          bottom={10}
          bg="whitesmoke"
          boxShadow="lg"
          px={8}
          py={2}
          left="50%"
          transform="translate(-50%, 0)"
          borderRadius="lg"
        >
          <EditorIconButton
            editor={editor!}
            property="bold"
            icon={<GoBold />}
            onClick={() => editor?.chain().focus().toggleBold().run()}
          />
          <EditorIconButton
            editor={editor!}
            property="italic"
            icon={<LuItalic />}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          />
          <EditorIconButton
            editor={editor!}
            property="code"
            icon={<FaCode />}
            onClick={() => editor?.chain().focus().toggleCode().run()}
          />
        </HStack>
      </Flex>
    </Stack>
  );
};
