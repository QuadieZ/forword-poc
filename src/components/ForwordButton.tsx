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
      bg: "brand.hoverSecondary",
    },
    _active: {
      bg: "brand.hoverSecondary",
    },
  },
  outline: {
    bg: "transparent",
    color: "brand.primary",
    borderColor: "brand.primary",
    border: "1px solid",
    _hover: {
      bg: "brand.secondary",
    },
    _active: {
      bg: "brand.secondary",
    },
  },
  ghost: {
    bg: "transparent",
    color: "brand.primary",
    _hover: {
      bg: "background.secondary",
    },
    _active: {
      bg: "background.secondary",
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
