"use client";

import { ForwordNavbar, ForwordSidebar } from "@/components";
import { BlogPreviewData, ForwordBlogList } from "@/components/ForwordBlogList";
import {
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

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
            </TabList>
            <TabPanels overflow="scroll" h="100%">
              <TabPanel>
                <ForwordBlogList blogs={mockBlogPreview} />
              </TabPanel>
              <TabPanel>
                <ForwordBlogList blogs={mockBlogPreview} />
              </TabPanel>
              <TabPanel>
                <ForwordBlogList blogs={mockBlogPreview} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Stack>
  );
}
