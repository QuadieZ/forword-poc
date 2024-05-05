import {
  FormControl,
  FormLabel,
  Input,
  InputProps,
  Text,
} from "@chakra-ui/react";

export type ForwordInputProps = {
  label: string;
} & InputProps;

export const ForwordInput = (props: ForwordInputProps) => {
  const { label, ...inputProps } = props;
  return (
    <FormControl>
      <FormLabel>
        <Text fontWeight={300}>{label}</Text>
      </FormLabel>
      <Input
        borderColor="border.primary"
        _active={{ borderColor: "brand.primary" }}
        _focus={{ borderColor: "brand.primary", boxShadow: "none" }}
        borderRadius={4}
        {...inputProps}
      />
    </FormControl>
  );
};
