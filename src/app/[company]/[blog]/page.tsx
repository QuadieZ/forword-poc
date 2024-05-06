import {
  BlogPreviewData,
  ForwordBlogList,
  ForwordButton,
  ForwordNavbar,
  ForwordSidebar,
} from "@/components";
import {
  Avatar,
  AvatarGroup,
  Divider,
  HStack,
  Heading,
  IconButton,
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
import { MdFavoriteBorder } from "react-icons/md";
import { HiOutlineBookmark } from "react-icons/hi";

export default function Page() {
  return (
    <Stack gap={0} spacing={0} h="100%">
      <ForwordNavbar />
      <Stack flexDir="row" flex={1} h="80vh">
        <Stack h="100%" flex={1} py={20} px={48} gap={8}>
          <Stack flexDir="row" justify="space-between">
            <Heading size="xl">Blog Post Title</Heading>
            <Stack flexDir="row" gap={4}>
              <IconButton aria-label="like" variant="ghost" borderRadius="full">
                <MdFavoriteBorder size={24} />
              </IconButton>
              <IconButton aria-label="like" variant="ghost" borderRadius="full">
                <HiOutlineBookmark size={24} />
              </IconButton>
            </Stack>
          </Stack>
          <HStack gap={6}>
            <Avatar
              name="John Doe"
              src="https://source.unsplash.com/random/800x600"
              size="md"
            />
            <Stack gap={0} flexDir="row" justify="space-between" w="100%">
              <Stack gap={1}>
                <Stack flexDir="row" align="center" gap={2}>
                  <Heading size="md">Org 1</Heading>
                  <ForwordButton variant="ghost" size="sm" px={4}>
                    Follow
                  </ForwordButton>
                </Stack>
                <Text fontWeight={300} fontSize="sm">
                  Software Engineer
                </Text>
              </Stack>
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
          <Divider borderColor="border.primary" />
          <Stack>
            <Text fontWeight={300}>
              Mock blog content goes here. Mock blog content goes here. Mock
              blog content goes here. Mock blog content goes here. Mock blog
              content goes here. Mock blog content goes here. Mock blog content
              goes here. Mock blog content goes here. Mock blog content goes
              here. Mock blog
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
