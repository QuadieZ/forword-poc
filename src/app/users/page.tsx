import {
  ForwordCollaboratorData,
  ForwordCollaboratorList,
  ForwordNavbar,
  ForwordSidebar,
} from "@/components";
import { Heading, Stack } from "@chakra-ui/react";

const mockCollaborators: ForwordCollaboratorData[] = [
  {
    name: "John Doe",
    description: "Software Engineer",
    image: "https://source.unsplash.com/random/800x600",
    slug: "jane-doe",
  },
  {
    name: "Jane Doe",
    description: "Designer",
    image: "https://source.unsplash.com/random/800x600",
    slug: "jane-doe",
  },
  {
    name: "John Smith",
    description: "Product Manager",
    image: "https://source.unsplash.com/random/800x600",
    slug: "jane-doe",
  },
  {
    name: "Jane Smith",
    description: "Software Engineer",
    image: "https://source.unsplash.com/random/800x600",
    slug: "jane-doe",
  },
  {
    name: "Jane Smith",
    description: "Software Engineer",
    image: "https://source.unsplash.com/random/800x600",
    slug: "jane-doe",
  },
  {
    name: "Jane Smith",
    description: "Software Engineer",
    image: "https://source.unsplash.com/random/800x600",
    slug: "jane-doe",
  },
];

export default function Page() {
  return (
    <Stack gap={0} spacing={0} h="100%">
      <ForwordNavbar />
      <Stack flexDir="row" flex={1} h="80vh">
        <ForwordSidebar />
        <Stack h="100%" flex={1} py={12} px={10}>
          <Heading size="lg">Collaborators</Heading>
          <ForwordCollaboratorList
            collaborators={mockCollaborators}
            type="user"
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
