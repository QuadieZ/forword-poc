"use client";

import { useUserStore } from "@/state";
import supabase from "@/supabase";
import {
  Avatar,
  AvatarGroup,
  Divider,
  Flex,
  HStack,
  Heading,
  Input,
  Link,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import LiveblocksProvider from "@liveblocks/yjs";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import NextLink from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { FaCode } from "react-icons/fa6";
import { GoBold } from "react-icons/go";
import { LuItalic } from "react-icons/lu";
import * as Y from "yjs";
import { EditorIconButton } from ".";
import {
  useBroadcastEvent,
  useEventListener,
  useOthers,
  useRoom,
} from "../../../liveblocks.config";
import { ForwordButton } from "../ForwordButton";
import { ForwordLink } from "../ForwordLink";
import { ForwordOverlayLoader } from "../ForwordOverlayLoader";

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
  const params = useParams<{ company: string; session: string }>();
  const room = useRoom();
  const broadcast = useBroadcastEvent();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();
  const [editor, setEditor] = useState<Editor | null>(null);
  const [title, setTitle] = useState<string>();

  const [isPublishing, setIsPublishing] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const { session, company } = params;
  //const currentUser = useSelf();
  const user = useUserStore((state) => state.user);
  const users = useOthers();

  const [blogId, setBlogId] = useState<string>("");
  const [isOwner, setIsOwner] = useState(false);
  const isSharable = true; // TODO: check if current user can share the blog

  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/companies/${params.company}/session/${params.session}`,
    }).then((res) => {
      const blogData = res.data.blogData[0];
      setTitle(blogData.blog_name);
    });
  }, []);

  const toast = useToast();
  useEffect(() => {
    async function checkIfUser() {
      console.log(session);
      const { data } = await supabase!
        .from("session")
        .select("owner_id, blog_id")
        .eq("session_id", session.replace("%3A", ":"))
        .limit(1);
      if (data && data.length > 0) {
        setIsOwner(data[0].owner_id === user?.user_id);
      }
      setBlogId(data[0].blog_id);
    }
    if (user && user.user_id && session) {
      checkIfUser();
    }
  }, [user, session]);
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

  function handleSubmitPublish() {
    const content = editor?.getHTML();
    onClose();
    setIsPublishing(true);
    axios({
      method: "POST",
      url: `/api/companies/${company}/session/${session}`,
      data: {
        blogName: title,
        blogId,
        content,
      },
    })
      .then(() => {
        setIsPublishing(false);
        toast({
          title: "Blog Published",
          description: "Your blog has been published successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push(`/${company}`);
      })
      .catch(() => {
        setIsPublishing(false);
        toast({
          title: "An error occurred while publishing the blog",
          description: "Please try again",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }

  function handlePublish() {
    onOpen();
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
      {isPublishing && <ForwordOverlayLoader />}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you ready to publish?</ModalHeader>
          <ModalFooter gap={4}>
            <ForwordButton onClick={onClose} variant="outline">
              Cancel
            </ForwordButton>
            <ForwordButton onClick={handleSubmitPublish}>Publish</ForwordButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
          <AvatarGroup size="sm" max={1}>
            {user && <Avatar name={user?.name!} borderColor="brand.primary" />}
            {users.map((user) => (
              <Avatar
                key={user.id as string}
                name={user.info ? (user.info as any).name : "Anonymous Unicorn"}
                borderColor={(user.presence as any).__yjs?.user?.color}
              />
            ))}
          </AvatarGroup>
          {/* {isSharable && <ForwordButton variant="outline">Share</ForwordButton>} */}
          {isOwner && (
            <ForwordButton onClick={handlePublish}>Publish</ForwordButton>
          )}
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
          isReadOnly={!isOwner}
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
        <Flex flex={1} w="100%">
          <TipTapEditor
            document={doc}
            provider={provider}
            setEditor={setEditor}
          />
        </Flex>
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
