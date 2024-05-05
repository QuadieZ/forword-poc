import { ForwordBlogCard, ForwordNavbar, ForwordSidebar } from "@/components";
import { BlogPreviewData, ForwordBlogList } from "@/components/ForwordBlogList";
import {
  Divider,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

const mockBlogPreview: BlogPreviewData[] = [
  {
    title: "How to build a blog with Next.js",
    description: "A step-by-step guide to building a blog with Next.js",
    image: "https://source.unsplash.com/random/800x600",
  },
  {
    title: "How to build a blog with Next.js",
    description: "A step-by-step guide to building a blog with Next.js",
    image: "https://source.unsplash.com/random/800x600",
  },
  {
    title: "How to build a blog with Next.js",
    description: "A step-by-step guide to building a blog with Next.js",
    image: "https://source.unsplash.com/random/800x600",
  },
  {
    title: "How to build a blog with Next.js",
    description: "A step-by-step guide to building a blog with Next.js",
    image: "https://source.unsplash.com/random/800x600",
  },
];

export default function Home() {
  return (
    <Stack gap={0} spacing={0} h="100%">
      <ForwordNavbar />
      <Stack flexDir="row" flex={1} h="80vh">
        <ForwordSidebar />
        <Stack h="100%" flex={1} py={12} px={10} gap={6}>
          <Heading size="lg">My Saved Blogs</Heading>
          <ForwordBlogList blogs={mockBlogPreview} />
        </Stack>
      </Stack>
    </Stack>
  );
}
