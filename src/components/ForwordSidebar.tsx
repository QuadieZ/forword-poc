import {
  Avatar,
  Center,
  Divider,
  HStack,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ForwordButton } from "./ForwordButton";
import NextLink from "next/link";
import { ReactElement, ReactNode } from "react";
import { Fa42Group } from "react-icons/fa6";
import { BsFillPeopleFill, BsPlus } from "react-icons/bs";

const SidebarItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon?: ReactElement;
}) => {
  return (
    <Link as={NextLink} href={href}>
      <ForwordButton
        px={0}
        variant="ghost"
        _hover={{
          bg: "none",
          color: "brand.primary",
        }}
        _active={{
          bg: "none",
          color: "brand.primary",
        }}
        leftIcon={icon}
        color="content.primary"
        fontWeight={300}
      >
        {title}
      </ForwordButton>
    </Link>
  );
};

export const ForwordSidebar = () => {
  return (
    <Stack w="18vw" h="100%" bg="background.secondary" py={6} px={6}>
      <Stack gap={4}>
        <SidebarItem href="#" title="User" icon={<Avatar boxSize={7} />} />
        <SidebarItem
          href="/organizations"
          title="Organizations"
          icon={<Fa42Group size={24} color="#3D58D8" />}
        />
        <SidebarItem
          href="/users"
          title="Collaborators"
          icon={<BsFillPeopleFill size={24} color="#3D58D8" />}
        />
      </Stack>
      <Center my={5}>
        <Divider borderColor="brand.hoverSecondary" w="85%" />
      </Center>
      <Stack w="100%" h="10vh">
        <HStack justify="space-between">
          <Text fontSize="sm" fontWeight={300}>
            Your Organizations
          </Text>
          <BsPlus size={20} />
        </HStack>
        <SidebarItem href="#" title="Org 1" icon={<Avatar boxSize={7} />} />
        <SidebarItem href="#" title="Org 2" icon={<Avatar boxSize={7} />} />
      </Stack>
    </Stack>
  );
};
