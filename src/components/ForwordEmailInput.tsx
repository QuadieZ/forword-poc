"use client";

import { Flex, IconButton, Tag, Text } from "@chakra-ui/react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { ReactMultiEmail } from "react-multi-email";

export type ForwordEmailInputProps = {
  emails: string[];
  setEmails: (emails: string[]) => void;
};

export const ForwordEmailInput = (props: ForwordEmailInputProps) => {
  const { emails, setEmails } = props;

  const [focus, setFocus] = useState(false);
  const [inputHasValue, setInputHasValue] = useState(false);

  return (
    <Flex
      gap={2}
      sx={{
        ".multi-email": {
          px: 3,
          border: "1px solid",
          borderColor: focus ? "brand.primary" : "border.primary",
          borderRadius: 4,
          py: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        },
        ".input-email": {
          _focus: {
            boxShadow: "none !important",
            outline: "none",
            fontWeight: 300,
          },
        },
      }}
      flexDirection="column"
    >
      <Text>Invite Collaborators</Text>
      <ReactMultiEmail
        placeholder={
          <Text
            pos="absolute"
            color="gray.500"
            ml={1}
            display={inputHasValue || emails.length > 0 ? "none" : "block"}
          >
            Invite through email
          </Text>
        }
        onChangeInput={(value) => {
          setInputHasValue(value.length > 0);
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="multi-email"
        inputClassName="input-email"
        emails={emails}
        onChange={(newEmails) => {
          setEmails(newEmails);
        }}
        getLabel={(email, index, removeEmail) => (
          <Tag bg="brand.primary" color="brand.contrast" key={index}>
            {email}
            <IconButton
              onClick={() => removeEmail(index)}
              aria-label="remove"
              borderRadius="full"
              color="brand.contrast"
              boxSize="20px"
              minW={0}
              ml={1}
              variant="ghost"
              _hover={{
                bg: "none",
                color: "brand.contrast",
              }}
            >
              <IoClose size={20} />
            </IconButton>
          </Tag>
        )}
      />
    </Flex>
  );
};
