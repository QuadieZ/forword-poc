import {
  Avatar,
  Card,
  CardBody,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { ForwordButton } from "./ForwordButton";
import { ForwordLink } from "./ForwordLink";

export type ForwordCollaboratorCardProps = {
  title: string;
  slug: string;
  description: string;
  image?: string;
  type?: "user" | "organization";
};

export const ForwordCollaboratorCard = (
  props: ForwordCollaboratorCardProps
) => {
  const { title, description, image, type = "organization", slug } = props;

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="ghost"
      background="none"
      align="center"
      minH="10vh"
      h="10vh"
      px={4}
      py={2}
    >
      <ForwordLink
        href={type === "organization" ? `/${slug}` : `/users/${slug}`}
        textAlign="start"
      >
        <Avatar size="lg" name={title} src={image} />
      </ForwordLink>
      <HStack flex={1} justify="space-between">
        <ForwordLink
          href={type === "organization" ? `/${slug}` : `/users/${slug}`}
          textAlign="start"
          color="content.primary"
        >
          <CardBody gap={2} flex={1}>
            <Heading size="md">{title}</Heading>
            <Text fontWeight={300}>{description}</Text>
          </CardBody>
        </ForwordLink>
        <ForwordButton variant="secondarySolid">Follow</ForwordButton>
      </HStack>
    </Card>
  );
};
