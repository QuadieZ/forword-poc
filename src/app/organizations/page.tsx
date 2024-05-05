import {
  ForwordCollaboratorCard,
  ForwordCollaboratorData,
  ForwordCollaboratorList,
  ForwordNavbar,
  ForwordSidebar,
} from "@/components";
import { Heading, Stack, Text } from "@chakra-ui/react";

const mockCollaborators: ForwordCollaboratorData[] = [
  {
    name: "John Doe",
    description: "Software Engineer",
    image: "https://source.unsplash.com/random/800x600",
  },
  {
    name: "Jane Doe",
    description: "Designer",
    image: "https://source.unsplash.com/random/800x600",
  },
  {
    name: "John Smith",
    description: "Product Manager",
    image: "https://source.unsplash.com/random/800x600",
  },
  {
    name: "Jane Smith",
    description: "Software Engineer",
    image: "https://source.unsplash.com/random/800x600",
  },
  {
    name: "Jane Smith",
    description: "Software Engineer",
    image: "https://source.unsplash.com/random/800x600",
  },
  {
    name: "Jane Smith",
    description: "Software Engineer",
    image: "https://source.unsplash.com/random/800x600",
  },
];

export default function Page() {
  return (
    <Stack gap={0} spacing={0} h="100%">
      <ForwordNavbar />
      <Stack flexDir="row" flex={1} h="80vh">
        <ForwordSidebar />
        <Stack h="100%" flex={1} py={12} px={10}>
          <Heading size="lg">Organizations</Heading>
          <ForwordCollaboratorList collaborators={mockCollaborators} />
        </Stack>
      </Stack>
    </Stack>
  );
}
