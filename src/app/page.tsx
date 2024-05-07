"use client";

import {
  ForwordButton,
  ForwordNavbar,
  ForwordSidebar,
  ForwordSpinner,
} from "@/components";
import { BlogPreviewData, ForwordBlogList } from "@/components/ForwordBlogList";
import { useUserStore } from "@/state";
import {
  Center,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Tables } from "../../types/supabase";

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

export default function Home() {
  const user = useUserStore((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const [forYouBlogs, setForYouBlogs] = useState<BlogPreviewData[]>([]);
  const [ourPicksBlogs, setOurPicksBlogs] = useState<BlogPreviewData[]>([]);
  const [followingBlogs, setFollowingBlogs] = useState<BlogPreviewData[]>([]);
  const [allBlogs, setAllBlogs] = useState<BlogPreviewData[]>([]);

  const router = useRouter();
  useEffect(() => {
    axios({
      method: "POST",
      url: "/api/feed",
      ...(user?.user_id
        ? {
            data: {
              uid: user?.user_id,
            },
          }
        : {}),
    })
      .then((res) => {
        const response = res.data.data;
        const allPostsData = response.allPostsData as Tables<"blog">[];
        const topPostsData = response.topPostsData as Tables<"blog">[];
        const recommendedPostsData =
          response.recommendedPostsData as Tables<"blog">[];
        const followingPosts = response.followingPosts as Tables<"blog">[];
        setForYouBlogs(
          topPostsData.map((blog) => ({
            title: blog.blog_name!,
            description: blog.blog_description ?? "A very awesome blog",
            image: blog.blog_image!,
            slug: blog.blog_id!,
            company: blog.organization_id!,
          }))
        );
        setOurPicksBlogs(
          recommendedPostsData.map((blog) => ({
            title: blog.blog_name!,
            description: blog.blog_description ?? "A very awesome blog",
            image: blog.blog_image!,
            slug: blog.blog_id!,
            company: blog.organization_id!,
          }))
        );
        setFollowingBlogs(
          followingPosts.map((blog) => ({
            title: blog.blog_name!,
            description: blog.blog_description ?? "A very awesome blog",
            image: blog.blog_image!,
            slug: blog.blog_id!,
            company: blog.organization_id!,
          }))
        );
        setAllBlogs(
          allPostsData.map((blog) => ({
            title: blog.blog_name!,
            description: blog.blog_description ?? "A very awesome blog",
            image: blog.blog_image!,
            slug: blog.blog_id!,
            company: blog.organization_id!,
          }))
        );
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Stack gap={0} spacing={0} h="100%">
      <ForwordNavbar />
      <Stack flexDir="row" flex={1}>
        <ForwordSidebar />
        <Stack flex={1} bg="background.primary" py={8} px={6}>
          <Tabs h="80vh">
            <TabList>
              <Tab>For You</Tab>
              <Tab>Our Picks</Tab>
              <Tab>Following</Tab>
              <Tab>All Blogs</Tab>
            </TabList>
            {isLoading ? (
              <ForwordSpinner />
            ) : (
              <TabPanels overflow="scroll" h="100%">
                <TabPanel>
                  <ForwordBlogList blogs={forYouBlogs} />
                </TabPanel>
                <TabPanel>
                  <ForwordBlogList blogs={ourPicksBlogs} />
                </TabPanel>
                <TabPanel h="100%">
                  {!user ? (
                    <Center w="100%" h="100%" flexDir="column" gap={4}>
                      <Text>
                        Join Forword today to follow your favorite blogs
                      </Text>
                      <ForwordButton
                        onClick={() => {
                          router.push("/auth/signup");
                        }}
                      >
                        Sign up Now!
                      </ForwordButton>
                    </Center>
                  ) : followingBlogs.length === 0 ? (
                    <Center w="100%" h="100%" flexDir="column" gap={4}>
                      <Text>
                        Start Following to see blogs from your favorite
                        organizations
                      </Text>
                      <ForwordButton
                        onClick={() => {
                          router.push("/organizations");
                        }}
                      >
                        See Organizations on Forword
                      </ForwordButton>
                    </Center>
                  ) : (
                    <ForwordBlogList blogs={followingBlogs} />
                  )}
                </TabPanel>
                <TabPanel>
                  <ForwordBlogList blogs={allBlogs} />
                </TabPanel>
              </TabPanels>
            )}
          </Tabs>
        </Stack>
      </Stack>
    </Stack>
  );
}
