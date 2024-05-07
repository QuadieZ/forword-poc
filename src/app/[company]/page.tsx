"use client";

import {
  BlogPreviewData,
  ForwordBlogList,
  ForwordNavbar,
  ForwordSidebar,
  ForwordSpinner,
} from "@/components";
import { useUserStore } from "@/state";
import {
  Avatar,
  AvatarGroup,
  Divider,
  HStack,
  Heading,
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
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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

  const currentUser = useUserStore((state) => state.user);
  const isMember = currentUser?.organization_id?.includes(company);

  const [isLoading, setIsLoading] = useState(true);
  const [companyData, setCompanyData] = useState<Tables<"organization">>();
  const [blogsData, setBlogsData] = useState<BlogPreviewData[]>([]);
  const [membersData, setMembersData] = useState<Tables<"user_info">[]>([]);

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
      setIsLoading(false);
    });
  }, []);

  return (
    <Stack gap={0} spacing={0} h="100%">
      <ForwordNavbar />
      <Stack flexDir="row" flex={1} h="80vh">
        <ForwordSidebar />
        {isLoading ? (
          <ForwordSpinner />
        ) : (
          <Stack h="100%" flex={1} py={12} px={10} gap={8}>
            <HStack justify="space-between">
              <HStack gap={6}>
                <Avatar
                  name="John Doe"
                  src="https://source.unsplash.com/random/800x600"
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
                      <ForwordBlogList blogs={mockBlogPreview} />
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
