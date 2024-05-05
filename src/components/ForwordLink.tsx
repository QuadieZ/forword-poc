import { Link, LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";
export type ForwordLinkProps = {} & LinkProps;

export const ForwordLink = (props: ForwordLinkProps) => {
  const { ...linkProps } = props;
  return (
    <Link
      as={NextLink}
      textAlign="center"
      color="brand.primary"
      _hover={{
        textDecoration: "none",
        color: "brand.hoverPrimary",
      }}
      {...linkProps}
    />
  );
};
