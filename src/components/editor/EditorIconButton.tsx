import { IconButton } from "@chakra-ui/react";
import { Editor } from "@tiptap/react";
import { ReactElement, ReactNode } from "react";

export type EditorIconButtonProps = {
  editor: Editor;
  property: string;
  icon: ReactElement;
  onClick: () => void;
};

export const EditorIconButton = (props: EditorIconButtonProps) => {
  const { editor, icon, property, onClick } = props;

  return (
    <IconButton
      aria-label="bold"
      icon={icon}
      background={editor?.isActive(property) ? "brand.primary" : "none"}
      color={editor?.isActive(property) ? "brand.contrast" : "black"}
      _hover={{
        background: editor?.isActive(property)
          ? "brand.hoverPrimary"
          : "gray.200",
      }}
      onClick={onClick}
    />
  );
};
