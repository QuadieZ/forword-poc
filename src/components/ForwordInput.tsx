import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  Text,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export type ForwordInputProps = {
  label?: string;
  leftIcon?: ReactNode;
} & InputProps;

export const ForwordInput = (props: ForwordInputProps) => {
  const { label, leftIcon, w, width, ...inputProps } = props;
  return (
    <FormControl w={w ?? width ?? "100%"}>
      {label && (
        <FormLabel>
          <Text fontWeight={300}>{label}</Text>
        </FormLabel>
      )}
      <InputGroup>
        {leftIcon && (
          <InputLeftElement pointerEvents="none">{leftIcon}</InputLeftElement>
        )}
        <Input
          borderColor="border.primary"
          _active={{ borderColor: "brand.primary" }}
          _focus={{ borderColor: "brand.primary", boxShadow: "none" }}
          borderRadius={4}
          fontWeight={300}
          {...inputProps}
        />
      </InputGroup>
    </FormControl>
  );
};
