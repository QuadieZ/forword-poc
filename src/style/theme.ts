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
            secondary: '#E7ECF5',
        },
        content: {
            primary: '#0D0D0D',
            secondary: '#4C4C4C',
            description: '#A8ADB7'
        },
        border: {
            primary: '#DFDFDF',
            secondary: '#6F7787'
        }
    },
    fonts: {
        heading: "Lexend",
        body: "Lexend",
    },

})