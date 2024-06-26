import { Divider, Stack } from "@chakra-ui/react";
import { ForwordCollaboratorCard } from "./ForwordCollaboratorCard";

export type ForwordCollaboratorData = {
  name: string;
  description: string;
  image?: string;
  slug: string;
};

export type ForwordCollaboratorListProps = {
  collaborators: ForwordCollaboratorData[];
  type?: "user" | "organization";
};

export const ForwordCollaboratorList = (
  props: ForwordCollaboratorListProps
) => {
  const { collaborators, type = "organization" } = props;

  return (
    <Stack
      h="100%"
      overflowY="scroll"
      spacing={4}
      py={6}
      divider={<Divider borderColor="border.primary" />}
    >
      {collaborators.map((collaborator) => (
        <ForwordCollaboratorCard
          key={collaborator.name}
          title={collaborator.name}
          description={collaborator.description}
          image={collaborator.image}
          slug={collaborator.slug}
          type={type}
        />
      ))}
    </Stack>
  );
};
