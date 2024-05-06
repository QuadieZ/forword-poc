import {
  BlogPreviewData,
  ForwordBlogList,
  ForwordNavbar,
  ForwordSidebar,
} from "@/components";
import {
  Avatar,
  AvatarGroup,
  Divider,
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
  const isMember = true;

  return (
    <Stack gap={0} spacing={0} h="100%">
      <ForwordNavbar />
      <Stack flexDir="row" flex={1} h="80vh">
        <ForwordSidebar />
        <Stack h="100%" flex={1} py={12} px={10} gap={8}>
          <HStack justify="space-between">
            <HStack gap={6}>
              <Avatar
                name="John Doe"
                src="https://source.unsplash.com/random/800x600"
                size="2xl"
              />
              <Stack gap={0}>
                <Heading size="lg">Org 1</Heading>
                <Text fontWeight={300}>Software Engineer</Text>
                <AvatarGroup size="sm" max={3} mt={2}>
                  <Avatar
                    name="Ryan Florence"
                    src="https://bit.ly/ryan-florence"
                  />
                  <Avatar
                    name="Segun Adebayo"
                    src="https://bit.ly/sage-adebayo"
                  />
                  <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
                  <Avatar
                    name="Prosper Otemuyiwa"
                    src="https://bit.ly/prosper-baba"
                  />
                </AvatarGroup>
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
                    <ForwordBlogList blogs={mockBlogPreview} />
                  </TabPanel>
                  <TabPanel>
                    <ForwordBlogList blogs={mockBlogPreview} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            ) : (
              <ForwordBlogList blogs={mockBlogPreview} />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
