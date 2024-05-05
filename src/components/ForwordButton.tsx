import { Button, ButtonProps } from "@chakra-ui/react";

export type ForwordButtonVariant =
  | "primarySolid"
  | "outline"
  | "ghost"
  | "secondarySolid";

export type ForwordButtonProps = {
  variant?: ForwordButtonVariant;
} & Omit<ButtonProps, "variant">;

const ButtonStyle: Record<ForwordButtonVariant, ButtonProps> = {
  primarySolid: {
    bg: "brand.primary",
    color: "brand.contrast",
    _hover: {
      bg: "brand.hoverPrimary",
    },
    _active: {
      bg: "brand.hoverPrimary",
    },
  },
  secondarySolid: {
    bg: "brand.secondary",
    color: "brand.primary",
    _hover: {
      bg: "brand.hoverPrimary",
    },
    _active: {
      bg: "brand.hoverPrimary",
    },
  },
  outline: {
    bg: "transparent",
    color: "brand.primary",
    borderColor: "brand.primary",
    _hover: {
      bg: "brand.primary",
      color: "brand.contrast",
    },
    _active: {
      bg: "brand.primary",
      color: "brand.contrast",
    },
  },
  ghost: {
    bg: "transparent",
    color: "brand.primary",
    _hover: {
      bg: "brand.primary",
      color: "brand.contrast",
    },
    _active: {
      bg: "brand.primary",
      color: "brand.contrast",
    },
  },
};

export const ForwordButton = (props: ForwordButtonProps) => {
  const { children, variant = "primarySolid", ...rest } = props;

  return (
    <Button
      {...ButtonStyle[variant]}
      borderRadius={4}
      px={6}
      w="fit-content"
      {...rest}
    >
      {children}
    </Button>
  );
};
