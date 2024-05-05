import { background, extendTheme } from "@chakra-ui/react";
import { editorStyle } from "./editorStyle";

export const theme = extendTheme({
    styles: {
        global: () => ({
            body: {
                ...editorStyle,
                '.chakra-avatar__excess': {
                    background: 'gray.300',
                    border: '2px solid #fff',
                },
                background: 'background.primary',
            }
        })
    },
    colors: {
        brand: {
            primary: '#3D58D8',
            hoverPrimary: '#304BC9',
            secondary: '#D8DEF7',
            hoverSecondary: '#C2CBEF',
            contrast: '#F5F5F5',
        },
        background: {
            primary: '#F5F5F5',
            secondary: '#EEF2FA',
        },
        content: {
            primary: '#0D0D0D',
            secondary: '#4C4C4C',
            description: '#A8ADB7'
        },
        border: {
            primary: '#6F7787',
            secondary: '#DFDFDF'
        }
    },
    fonts: {
        heading: "Lexend",
        body: "Lexend",
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