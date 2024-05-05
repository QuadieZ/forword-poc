import {
  BlogPreviewData,
  ForwordBlogList,
  ForwordNavbar,
  ForwordSidebar,
} from "@/components";
import {
  Avatar,
  HStack,
  Heading,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
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

export default function Page() {
  return (
    <Stack gap={0} spacing={0} h="100%">
      <ForwordNavbar />
      <Stack flexDir="row" flex={1} h="80vh">
        <ForwordSidebar />
        <Stack h="100%" flex={1} py={12} px={10} gap={12}>
          <HStack justify="space-between">
            <HStack gap={6}>
              <Avatar
                name="John Doe"
                src="https://source.unsplash.com/random/800x600"
                size="2xl"
              />
              <Stack gap={1}>
                <Heading size="lg">John Doe</Heading>
                <Text fontWeight={300}>Software Engineer</Text>
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
                <StatNumber color="brand.primary">5</StatNumber>
                <StatHelpText m={0}>This Month</StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Followers</StatLabel>
                <StatNumber color="brand.primary">45</StatNumber>
                <StatHelpText m={0}>This Month</StatHelpText>
              </Stat>
            </HStack>
          </HStack>
          <Tabs h="70%">
            <TabList>
              <Tab>Completed Blogs</Tab>
              <Tab>In Progress</Tab>
            </TabList>
            <TabPanels overflow="scroll" h="100%">
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
