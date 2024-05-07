"use client";

import {
  ForwordCollaboratorData,
  ForwordCollaboratorList,
  ForwordNavbar,
  ForwordSidebar,
  ForwordSpinner,
} from "@/components";
import { Heading, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Tables } from "../../../types/supabase";

const mockCollaborators: ForwordCollaboratorData[] = [
  {
    name: "John Doe",
    description: "Software Engineer",
    image: "https://source.unsplash.com/random/800x600",
    slug: "org1",
  },
  {
    name: "Jane Doe",
    description: "Designer",
    image: "https://source.unsplash.com/random/800x600",
    slug: "org1",
  },
  {
    name: "John Smith",
    description: "Product Manager",
    image: "https://source.unsplash.com/random/800x600",
    slug: "org1",
  },
  {
    name: "Jane Smith",
    description: "Software Engineer",
    image: "https://source.unsplash.com/random/800x600",
    slug: "org1",
  },
  {
    name: "Jane Smith",
    description: "Software Engineer",
    image: "https://source.unsplash.com/random/800x600",
    slug: "org1",
  },
  {
    name: "Jane Smith",
    description: "Software Engineer",
    image: "https://source.unsplash.com/random/800x600",
    slug: "org1",
  },
];

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState<ForwordCollaboratorData[]>([]);
  useEffect(() => {
    axios.get("/api/companies").then((res) => {
      const data = res.data.data as Tables<"organization">[];
      setCompanies(
        data.map((company) => ({
          name: company.organization_name,
          description: company.description ?? "A very cool organization!",
          slug: company.organization_id,
        }))
      );
      setIsLoading(false);
    });
  }, []);

  return (
    <Stack gap={0} spacing={0} h="100%">
      <ForwordNavbar />
      <Stack flexDir="row" flex={1} h="80vh">
        <ForwordSidebar />
        <Stack h="100%" flex={1} py={12} px={10}>
          <Heading size="lg">Organizations</Heading>
          {isLoading ? (
            <ForwordSpinner />
          ) : (
            <ForwordCollaboratorList collaborators={companies} />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
