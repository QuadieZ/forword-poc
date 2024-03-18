import { extendTheme } from "@chakra-ui/react";
import { editorStyle } from "./editorStyle";

export const theme = extendTheme({
    styles: {
        global: () => (editorStyle)
    },
    colors: {
        brand: {
            primary: '#4CCD99',
            hoverPrimary: '#3DBB8E',
            contrast: '#F5F5F5',
        }
    },
    fonts: {
        heading: "Quicksand",
        body: "Quicksand",
    },
    components: {
        Button: {
            variants: {
                solid: {
                    bg: "brand.primary",
                    color: "brand.contrast",
                    _hover: {
                        bg: "brand.hoverPrimary",
                    },
                    _active: {
                        bg: "brand.hoverPrimary",
                    }
                }
            }
        }
    }
})