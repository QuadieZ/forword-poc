"use client";

import { ForwordButton, ForwordInput, ForwordLink } from "@/components";
import {
  Box,
  Center,
  HStack,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const toast = useToast();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (!email || !password || !name || !username) {
      toast({
        title: "Please fill all fields.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Password must be at least 8 characters long.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    axios({
      method: "POST",
      url: "/api/auth/signup",
      data: {
        email,
        password,
        name,
        username,
      },
    })
      .then((res) => {
        console.log(res);
        toast({
          title: "Account created.",
          description: "We have sent you an email to verify your account.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.push("/auth/login");
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          toast({
            title: err.response.data.error,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: "An error occurred.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
        setIsLoading(false);
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
      <Heading fontSize="3xl">
        Sign up for{" "}
        <Box as="span" color="brand.primary">
          Forword
        </Box>
      </Heading>
      <Stack w={["70%", "50%", "50%", "25%"]} gap={2}>
        <ForwordInput
          label="Name"
          onChange={handleNameChange}
          value={name}
          w="100%"
        />
        <ForwordInput
          label="Username"
          onChange={handleUsernameChange}
          value={username}
          w="100%"
        />
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
          <ForwordButton onClick={handleSubmit} w="100%" isLoading={isLoading}>
            Sign up
          </ForwordButton>
          <Stack mt={4} gap={4}>
            <HStack justify="center" flexWrap="wrap" lineHeight={0.8}>
              <Text fontWeight={300}>Have an account? </Text>
              <ForwordLink href="/auth/login">Sign in</ForwordLink>
            </HStack>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}
