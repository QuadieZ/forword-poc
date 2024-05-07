"use client";

import { ForwordButton, ForwordNavbar, ForwordSpinner } from "@/components";
import {
  Avatar,
  Divider,
  HStack,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import parse from "html-react-parser";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineBookmark } from "react-icons/hi";
import { MdFavoriteBorder } from "react-icons/md";
import { Tables } from "../../../../types/supabase";

export default function Page() {
  const { company, blog } = useParams<{
    company: string;
    blog: string;
  }>();
  const [isLoading, setIsLoading] = useState(true);
  const [companyData, setCompanyData] = useState<Tables<"organization">>(); // [1
  const [blogData, setBlogData] = useState<Tables<"blog">>();

  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/companies/${company}/${blog}`,
    }).then((res) => {
      setBlogData(res.data.blogData[0]);
      setCompanyData(res.data.companyData[0]);
      setIsLoading(false);
    });
  }, []);

  return (
    <Stack gap={0} spacing={0} h="100%">
      <ForwordNavbar />
      {isLoading ? (
        <ForwordSpinner />
      ) : (
        <Stack flexDir="row" flex={1} h="80vh">
          <Stack h="100%" flex={1} py={20} px={48} gap={8}>
            <Stack flexDir="row" justify="space-between">
              <Heading size="xl">{blogData?.blog_name}</Heading>
              <Stack flexDir="row" gap={4}>
                <IconButton
                  aria-label="like"
                  variant="ghost"
                  borderRadius="full"
                >
                  <MdFavoriteBorder size={24} />
                </IconButton>
                <IconButton
                  aria-label="like"
                  variant="ghost"
                  borderRadius="full"
                >
                  <HiOutlineBookmark size={24} />
                </IconButton>
              </Stack>
            </Stack>
            <HStack gap={6}>
              <Avatar name={companyData?.organization_name} size="md" />
              <Stack gap={0} flexDir="row" justify="space-between" w="100%">
                <Stack gap={1}>
                  <Stack flexDir="row" align="center" gap={2}>
                    <Heading size="md">
                      {companyData?.organization_name}
                    </Heading>
                    <ForwordButton variant="ghost" size="sm" px={4}>
                      Follow
                    </ForwordButton>
                  </Stack>
                  <Text fontWeight={300} fontSize="sm">
                    {companyData?.description}
                  </Text>
                </Stack>
                {/* <AvatarGroup size="sm" max={3} mt={2}>
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
                </AvatarGroup> */}
              </Stack>
            </HStack>
            <Divider borderColor="border.primary" />
            <Stack>{parse(blogData?.blog_detail ?? "")}</Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
