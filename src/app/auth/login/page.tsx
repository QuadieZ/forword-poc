"use client";

import { ForwordButton, ForwordInput, ForwordLink } from "@/components";
import { emailSignin } from "@/supabase";
import {
  Box,
  Center,
  HStack,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [password, setPassword] = useState("");

  const toast = useToast();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (!email || !password) {
      toast({
        title: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(true);
    emailSignin({ email, password })
      .then((res) => {
        setIsLoading(false);
        router.push("/");
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          title: "Incorrect email or password",
          description: err.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
          <ForwordButton onClick={handleLogin} w="100%" isLoading={isLoading}>
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
