"use client";

import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function Page() {
  return (
    <Center
      w="100vw"
      h="100vh"
      pos="absolute"
      top={0}
      right={0}
      flexDir="column"
      gap={6}
    >
      <Heading fontSize="2xl">
        Login to{" "}
        <Box as="span" color="brand.primary">
          Forword
        </Box>
      </Heading>
      <Stack w="25%">
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            _active={{ borderColor: "brand.primary" }}
            _focus={{ borderColor: "brand.primary", boxShadow: "none" }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            _active={{ borderColor: "brand.primary" }}
            _focus={{ borderColor: "brand.primary", boxShadow: "none" }}
          />
        </FormControl>
        <Stack mt={6} gap={4}>
          <Button>Login</Button>
          <Link
            as={NextLink}
            href="/signup"
            textAlign="center"
            _hover={{
              textDecoration: "none",
              color: "brand.hoverPrimary",
            }}
          >
            {"Don't have an account? Sign up now"}
          </Link>
        </Stack>
      </Stack>
    </Center>
  );
}
