"use client";

import { useUserStore } from "@/state";
import supabase from "@/supabase";
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
import axios from "axios";
import NextLink from "next/link";
import { ReactElement, useEffect, useState } from "react";
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
    <Link as={NextLink} href={href} textAlign="start">
      <ForwordButton
        minW={0}
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
  const user = useUserStore((state) => state.user);
  const organizations = useUserStore((state) => state.organizations);
  const setOrganizations = useUserStore((state) => state.setOrganizations);
  const addOrganization = useUserStore((state) => state.addOrganization);

  const isLoggedIn = !!user;

  const { onClose, onOpen, isOpen } = useDisclosure();

  const [orgName, setOrgName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [displayOrganizations, setDisplayOrganizations] = useState<
    | {
        organization_id: string;
        organization_name: string;
      }[]
    | []
  >([]);

  function handleCloseModal() {
    setOrgName("");
    setEmails([]);
    onClose();
  }

  useEffect(() => {
    async function getOrganizations(orgsId: string[]) {
      const { data } = await supabase!
        .from("organization")
        .select("*")
        .in("organization_id", orgsId);

      return data;
    }

    if (user) {
      console.log(organizations);
      if (organizations.length > 0) {
        setDisplayOrganizations(
          organizations.map((org) => ({
            organization_id: org.organization_id,
            organization_name: org.organization_name,
          }))
        );
      } else {
        const userOrgs = user.organization_id;
        if (userOrgs && userOrgs?.length > 0) {
          const orgs = getOrganizations(userOrgs).then((orgs) => {
            setOrganizations(orgs ?? []);
            setDisplayOrganizations(
              orgs?.map((org) => ({
                organization_id: org.organization_id,
                organization_name: org.organization_name,
              })) ?? []
            );
          });
        }
      }
    }
  }, [user]);

  async function handleCreateOrganization() {
    setIsLoading(true);
    axios({
      method: "POST",
      url: "/api/companies",
      data: {
        organizationName: orgName,
        emails,
        currentUserId: user?.user_id,
      },
    })
      .then((res) => {
        const organization = res.data.data[0];
        addOrganization(organization);
        setDisplayOrganizations((prev) => [
          ...prev,
          {
            organization_id: organization.organization_id,
            organization_name: organization.organization_name,
          },
        ]);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
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
        {isLoggedIn && (
          <SidebarItem
            href="/users/me"
            title={user.name ?? "Anonymous Unicorn"}
            icon={<Avatar boxSize={7} name={user.name ?? ""} />}
          />
        )}
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
      {isLoggedIn && (
        <Stack w="100%" h="100%">
          <HStack justify="space-between">
            <Text fontSize="sm" fontWeight={300}>
              Your Organizations
            </Text>
            <BsPlus size={20} cursor="pointer" onClick={() => onOpen()} />
          </HStack>
          <Stack gap={0} pl={4} mt={1}>
            {displayOrganizations.length > 0 ? (
              displayOrganizations.map((org) => (
                <SidebarItem
                  key={org.organization_id}
                  href={`/${org.organization_id}`}
                  title={org.organization_name}
                />
              ))
            ) : (
              <ForwordButton
                mt={4}
                variant="secondarySolid"
                _hover={{
                  bg: "none",
                  color: "brand.primary",
                }}
                _active={{
                  bg: "none",
                  color: "brand.primary",
                }}
                color="content.primary"
                fontWeight={300}
                onClick={() => onOpen()}
              >
                Create an organization
              </ForwordButton>
            )}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
