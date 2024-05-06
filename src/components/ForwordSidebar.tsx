"use client";

import {
  Avatar,
  Center,
  Divider,
  Flex,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactElement, useState } from "react";
import { BsFillPeopleFill, BsPlus } from "react-icons/bs";
import { Fa42Group } from "react-icons/fa6";
import { ForwordButton } from "./ForwordButton";
import { ForwordEmailInput } from "./ForwordEmailInput";
import { ForwordInput } from "./ForwordInput";

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
  const { onClose, onOpen, isOpen } = useDisclosure();

  const [orgName, setOrgName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  function handleCloseModal() {
    setOrgName("");
    setEmails([]);
    onClose();
  }

  async function handleCreateOrganization() {
    setIsLoading(true);
    fetch("/api/companies", {
      method: "POST",
      body: JSON.stringify({
        currentUserId: "user-1",
        currentUser: "user-1",
        organizationName: orgName,
        emails: emails,
      }),
    }).then(() => {
      setIsLoading(false);
      handleCloseModal();
    });
  }

  return (
    <Stack w="18vw" h="100%" bg="background.secondary" py={6} px={6}>
      <Modal
        onClose={handleCloseModal}
        isOpen={isOpen}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new organization</ModalHeader>
          <ModalBody pb={8} pr={16}>
            <Flex gap={6} flexDir="column">
              <ForwordInput
                label="Organization Name"
                value={orgName}
                placeholder="Give it a cool name"
                onChange={(e) => setOrgName(e.target.value)}
              />
              <ForwordEmailInput emails={emails} setEmails={setEmails} />
            </Flex>
          </ModalBody>
          <ModalFooter gap={4}>
            <ForwordButton onClick={handleCloseModal} variant="outline">
              Cancel
            </ForwordButton>
            <ForwordButton
              onClick={handleCreateOrganization}
              isLoading={isLoading}
            >
              Create
            </ForwordButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack gap={4}>
        <SidebarItem
          href="/users/me"
          title="User"
          icon={<Avatar boxSize={7} />}
        />
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
          <BsPlus size={20} cursor="pointer" onClick={() => onOpen()} />
        </HStack>
        <SidebarItem href="#" title="Org 1" icon={<Avatar boxSize={7} />} />
        <SidebarItem href="#" title="Org 2" icon={<Avatar boxSize={7} />} />
      </Stack>
    </Stack>
  );
};
