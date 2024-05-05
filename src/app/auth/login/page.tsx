"use client";

import { ForwordButton, ForwordInput, ForwordLink } from "@/components";
import { emailSignin } from "@/supabase";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
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
    router.push("/");
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
      gap={8}
      pb={4}
    >
      <Stack align="center">
        <Heading fontSize="3xl">
          Welcome to{" "}
          <Box as="span" color="brand.primary">
            Forword
          </Box>
        </Heading>
        <Text fontWeight={300}>Sign in to continue</Text>
      </Stack>
      <Stack w={["70%", "50%", "50%", "25%"]} gap={2}>
        <ForwordInput
          label="Email"
          onChange={handleEmailChange}
          value={email}
          w="100%"
        />
        <ForwordInput
          label="Password"
          type="password"
          onChange={handlePasswordChange}
          value={password}
          w="100%"
        />
        <Stack mt={6}>
          <ForwordButton onClick={handleLogin} w="100%">
            Sign in
          </ForwordButton>
          <Stack mt={4} gap={4}>
            <ForwordLink href="/auth/forget-password">
              Forgot password?
            </ForwordLink>
            <HStack justify="center" flexWrap="wrap" lineHeight={0.8}>
              <Text fontWeight={300}>Not yet registered? </Text>
              <ForwordLink href="/auth/signup">Create an account</ForwordLink>
            </HStack>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}
