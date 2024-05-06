"use client";

import { useUserStore } from "@/state";
import supabase from "@/supabase";
import {
  Avatar,
  HStack,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { IoLogOut, IoSettings } from "react-icons/io5";
import { ForwordButton } from "./ForwordButton";
import { ForwordInput } from "./ForwordInput";
import { ForwordLink } from "./ForwordLink";

export const ForwordNavbar = () => {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const router = useRouter();
  const isLogin = !!user; // TODO: replace with actual login state

  function handleLogout() {
    supabase?.auth.signOut();
    clearUser();
    router.push("/auth/login");
  }

  return (
    <HStack
      px={[8, 10, 10]}
      w="100%"
      h="10vh"
      justify="space-between"
      borderBottom="1px solid"
      borderColor="border.primary"
    >
      <HStack gap={[5, 10, 10, 20]}>
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
        <ForwordInput
          border="none"
          bg="background.secondary"
          leftIcon={<FiSearch />}
          w={["40vw", "40vw", "35vw", "30vw"]}
          pl={10}
          placeholder="Search blogs, organizations, and more..."
        />
      </HStack>
      <HStack spacing={6} display={["none", "flex", "flex"]}>
        {isLogin ? (
          <>
            {/* <ForwordButton variant="secondarySolid">Create</ForwordButton> */}
            {/* <Avatar
              color="brand.primary"
              background="none"
              icon={<RiNotification3Fill size={28} />}
              p={0}
              boxSize={8}
            >
              <AvatarBadge
                boxSize="0.9em"
                bg="green.500"
                top={-1}
                right={0.5}
              />
            </Avatar> */}
            <Menu>
              <MenuButton>
                <Avatar boxSize={10} name={user.name ?? "Anonymous Unicorn"} />
              </MenuButton>
              <MenuList>
                <MenuItem
                  px={6}
                  icon={<IoSettings size={16} color="#3D58D8" />}
                >
                  Setting
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  icon={<IoLogOut size={16} color="#3D58D8" />}
                  px={6}
                >
                  Log out
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <ForwordLink href="/auth/login">
            <ForwordButton>Login</ForwordButton>
          </ForwordLink>
        )}
      </HStack>
    </HStack>
  );
};
