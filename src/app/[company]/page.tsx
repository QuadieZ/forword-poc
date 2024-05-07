"use client";

import {
  BlogPreviewData,
  ForwordBlogList,
  ForwordButton,
  ForwordInput,
  ForwordNavbar,
  ForwordOverlayLoader,
  ForwordSidebar,
  ForwordSpinner,
} from "@/components";
import { useUserStore } from "@/state";
import {
  Avatar,
  AvatarGroup,
  Divider,
  Flex,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdCreate } from "react-icons/io";
import { Tables } from "../../../types/supabase";

const mockBlogPreview: BlogPreviewData[] = [
  {
    title: "How to build a blog with Next.js",
    description: "A step-by-step guide to building a blog with Next.js",
    image: "https://source.unsplash.com/random/800x600",
    slug: "how-to-build-a-blog-with-next-js",
    company: "forword",
  },
  {
    title: "How to build a blog with Next.js",
    description: "A step-by-step guide to building a blog with Next.js",
    image: "https://source.unsplash.com/random/800x600",
    slug: "how-to-build-a-blog-with-next-js",
    company: "forword",
  },
  {
    title: "How to build a blog with Next.js",
    description: "A step-by-step guide to building a blog with Next.js",
    image: "https://source.unsplash.com/random/800x600",
    slug: "how-to-build-a-blog-with-next-js",
    company: "forword",
  },
  {
    title: "How to build a blog with Next.js",
    description: "A step-by-step guide to building a blog with Next.js",
    image: "https://source.unsplash.com/random/800x600",
    slug: "how-to-build-a-blog-with-next-js",
    company: "forword",
  },
];

export default function Page() {
  const { company } = useParams<{ company: string }>();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const currentUser = useUserStore((state) => state.user);
  const isMember = currentUser?.organization_id?.includes(company);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [companyData, setCompanyData] = useState<Tables<"organization">>();
  const [blogsData, setBlogsData] = useState<BlogPreviewData[]>([]);
  const [membersData, setMembersData] = useState<Tables<"user_info">[]>([]);
  const [blogName, setBlogName] = useState("");
  const [description, setDescription] = useState("");
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [activeSessions, setActiveSessions] = useState<BlogPreviewData[]>([]);

  const toast = useToast();
  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/companies/${company}`,
    }).then((res) => {
      console.log(res.data.data);
      const response = res.data.data;

      setCompanyData(response.company[0]);
      setBlogsData(
        (response.blogs as Tables<"blog">[]).map((blog) => ({
          title: blog.blog_name!,
          description: blog.blog_description ?? "A very cool blog!",
          image:
            blog.blog_image ?? "https://source.unsplash.com/random/800x600",
          slug: blog.blog_id,
          company: company,
        }))
      );
      setMembersData(response.members);

      const allSessions = response?.activeSessions;
      const blogDataSession = response?.blogDataSession;

      setActiveSessions(
        blogDataSession?.map((blog) => ({
          title: blog.blog_name!,
          description: blog.blog_description ?? "A very cool blog!",
          image:
            blog.blog_image ?? "https://source.unsplash.com/random/800x600",
          slug: `create/${
            allSessions.find((session: any) => session.blog_id === blog.blog_id)
              ?.session_id
          }/editor`,
          company: company,
        }))
      );
      setIsLoading(false);
    });
  }, []);

  function handleCancelCreateSession() {
    onClose();
    setBlogName("");
    setDescription("");
  }

  function handleConfirmCreateSession() {
    setIsCreatingSession(true);
    onClose();
    setBlogName("");
    setDescription("");
    axios({
      method: "POST",
      url: `/api/companies/${company}/session`,
      data: {
        blogName: blogName,
        description: description,
        uid: currentUser?.user_id,
      },
    })
      .then((res) => {
        const sessionId = res.data.sessionId;
        toast({
          title: "Session created",
          description: "Redirecting to the session page...",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.push(`/${company}/create/${company}:${sessionId}/editor`);
      })
      .catch(() => {
        toast({
          title: "Failed to create session",
          description: "Please try again",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }

  return (
    <Stack gap={0} spacing={0} h="100%">
      {isCreatingSession && <ForwordOverlayLoader />}
      <ForwordNavbar />
      <Stack flexDir="row" flex={1} h="80vh">
        <ForwordSidebar />
        <Modal
          isOpen={isOpen}
          onClose={handleCancelCreateSession}
          closeOnOverlayClick={false}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a new writing session</ModalHeader>
            <ModalBody pb={8} pr={16}>
              <Flex gap={6} flexDir="column">
                <ForwordInput
                  label="Blog Name"
                  value={blogName}
                  placeholder="Give it a cool name"
                  onChange={(e) => setBlogName(e.target.value)}
                />
                <ForwordInput
                  label="Description"
                  value={description}
                  placeholder="Descriptive description for your org"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Flex>
            </ModalBody>
            <ModalFooter gap={4}>
              <ForwordButton
                variant="outline"
                onClick={handleCancelCreateSession}
              >
                Cancel
              </ForwordButton>
              <ForwordButton
                isLoading={isLoading}
                onClick={handleConfirmCreateSession}
              >
                Create
              </ForwordButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {isLoading ? (
          <ForwordSpinner />
        ) : (
          <Stack h="100%" flex={1} py={12} px={10} gap={8}>
            <HStack justify="space-between">
              <HStack gap={6}>
                <Avatar
                  name={companyData?.organization_name ?? "Forword"}
                  //src="https://source.unsplash.com/random/800x600"
                  size="2xl"
                />
                <Stack gap={0}>
                  <Heading size="lg">{companyData?.organization_name}</Heading>
                  <Text fontWeight={300}>
                    {companyData?.description ?? "A very awesome company!"}
                  </Text>
                  {membersData && (
                    <AvatarGroup size="sm" max={3} mt={2}>
                      {membersData.map((member) => (
                        <Avatar
                          key={member.user_id}
                          name={member.name ?? "John Doe"}
                        />
                      ))}
                    </AvatarGroup>
                  )}
                </Stack>
              </HStack>
              <HStack
                gap={12}
                bg="background.secondary"
                px={8}
                py={4}
                mr={4}
                borderRadius={4}
              >
                <Stat>
                  <StatLabel>Posts</StatLabel>
                  <StatNumber color="brand.primary">
                    {blogsData.length}
                  </StatNumber>
                  <StatHelpText m={0}>This Month</StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>Followers</StatLabel>
                  <StatNumber color="brand.primary">
                    {companyData?.followers_count}
                  </StatNumber>
                  <StatHelpText m={0}>This Month</StatHelpText>
                </Stat>
              </HStack>
            </HStack>
            <Divider borderColor="border.primary" />
            <Stack h="100%" overflow="scroll" px={isMember ? 0 : 12}>
              {isMember ? (
                <Tabs>
                  <TabList>
                    <Tab>All Blogs</Tab>
                    <Tab>Active Sessions</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <ForwordBlogList blogs={blogsData} />
                    </TabPanel>
                    <TabPanel>
                      <Flex justify="flex-end" mb={4}>
                        <ForwordButton gap={2} onClick={onOpen}>
                          <IoMdCreate />
                          Create Session
                        </ForwordButton>
                      </Flex>
                      <ForwordBlogList blogs={activeSessions} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              ) : (
                <ForwordBlogList blogs={blogsData} />
              )}
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
