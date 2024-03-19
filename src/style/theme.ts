import { extendTheme } from "@chakra-ui/react";
import { editorStyle } from "./editorStyle";

export const theme = extendTheme({
    styles: {
        global: () => ({
            body: {
                ...editorStyle,
                '.chakra-avatar__excess': {
                    background: 'gray.300',
                    border: '2px solid #fff',
                }
            }
        })
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
        },
        Input: {
            _active: { borderColor: "brand.primary" },
            _focus: { borderColor: "brand.primary", boxShadow: "none" }
        }
    }
})