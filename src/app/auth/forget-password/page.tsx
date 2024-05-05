"use client";

import { ForwordButton, ForwordInput, ForwordLink } from "@/components";
import { Center, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = () => {
    // Add forgot password logic here
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
        <Heading fontSize="3xl">Forgot Password</Heading>
        <Text fontWeight={300}>Recover your password with email</Text>
      </Stack>
      <Stack w={["70%", "50%", "50%", "25%"]} gap={2}>
        <ForwordInput
          label="Email"
          onChange={handleEmailChange}
          value={email}
          w="100%"
        />
        <Stack mt={6}>
          <ForwordButton onClick={handleForgotPassword} w="100%">
            Send Recovery Email
          </ForwordButton>
          <Stack mt={4} gap={4}>
            <HStack justify="center" flexWrap="wrap" lineHeight={0.8}>
              <Text fontWeight={300}>Remembered your password? </Text>
              <ForwordLink href="/auth/login">Sign in</ForwordLink>
            </HStack>
            <ForwordLink href="/auth/signup">Create New Account</ForwordLink>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}
