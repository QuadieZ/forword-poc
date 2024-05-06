import {
  Avatar,
  AvatarGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

export type ForwordBlogCardProps = {
  title: string;
  description: string;
  image: string;
};

export const ForwordBlogCard = (props: ForwordBlogCardProps) => {
  const { title, description, image } = props;
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="ghost"
      background="none"
      minH="20vh"
    >
      <Image objectFit="cover" w="20%" h="20vh" src={image} alt={title} />
      <Stack>
        <CardBody>
          <Heading size="md">{title}</Heading>

          <Text py="2" fontWeight={300}>
            {description}
          </Text>
          <AvatarGroup size="sm" max={3} mt={2}>
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
          </AvatarGroup>
        </CardBody>
      </Stack>
    </Card>
  );
};
