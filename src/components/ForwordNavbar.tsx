import {
  Avatar,
  AvatarBadge,
  Flex,
  HStack,
  Heading,
  Menu,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ForwordInput } from "./ForwordInput";
import { FiSearch } from "react-icons/fi";
import { RiNotification3Fill } from "react-icons/ri";
import { ForwordButton } from "./ForwordButton";

export const ForwordNavbar = () => {
  const isLogin = true; // TODO: replace with actual login state

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
        <Heading as="h2" fontSize="xl">
          Forword
        </Heading>
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
            <Avatar
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
            </Avatar>
            <Avatar boxSize={8} />
          </>
        ) : (
          <ForwordButton>Login</ForwordButton>
        )}
      </HStack>
    </HStack>
  );
};
