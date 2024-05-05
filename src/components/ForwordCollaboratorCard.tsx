import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ForwordButton } from "./ForwordButton";

export type ForwordCollaboratorCardProps = {
  title: string;
  description: string;
  image?: string;
};

export const ForwordCollaboratorCard = (
  props: ForwordCollaboratorCardProps
) => {
  const { title, description, image } = props;
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
      <Avatar size="lg" name={title} src={image} />
      <HStack flex={1} justify="space-between">
        <CardBody gap={2}>
          <Heading size="md">{title}</Heading>
          <Text fontWeight={300}>{description}</Text>
        </CardBody>
        <ForwordButton variant="secondarySolid">Follow</ForwordButton>
      </HStack>
    </Card>
  );
};
