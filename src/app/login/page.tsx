"use client";

import { emailSignin } from "@/supabase";
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
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    emailSignin({ email, password }).then((res) => {
      router.push("/editor");
    });
  };

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
            onChange={handleEmailChange}
            value={email}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            _active={{ borderColor: "brand.primary" }}
            _focus={{ borderColor: "brand.primary", boxShadow: "none" }}
            onChange={handlePasswordChange}
            value={password}
          />
        </FormControl>
        <Stack mt={6} gap={4}>
          <Button onClick={handleLogin}>Login</Button>
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
