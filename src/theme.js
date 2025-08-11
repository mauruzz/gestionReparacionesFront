import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: "'Roboto', sans-serif",
    },
    palette: {
        primary: {
            main: "#252525",
            dark: "#252525",
        },
        text: {
            primary: "#344767",
            secondary: "#8392ab",
        },
        background: {
            default: "#f4f6f8",
        },
    },
    shape: {
        borderRadius: 8,
    },
});

export default theme;
