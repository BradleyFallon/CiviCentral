// File: theme.js
// This file is used to override the default theme of Material UI.
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#23226f', // --civi-dark
        },
        secondary: {
            main: '#6f92b4', // --civi-muted
        },
        bright: {
            main: '#58FFED', // --civi-bright
        },
        accent: {
            main: '#29D958', // --civi-accent
        },
        light: {
            main: '#d7f1e7', // --civi-light
        },
        background: {
            default: '#1a1a4b', // --civi-darker
        },
        text: {
            primary: '#23226f', // --civi-dark
        },
        success: {
            main: '#29D958', // --civi-accent
        },
        info: {
            main: '#58FFED', // --civi-bright
        },
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
        h1: {
            fontFamily: "'Lato', sans-serif",
        },
        h2: {
            fontFamily: "'Lato', sans-serif",
        },
        h3: {
            fontFamily: "'Lato', sans-serif",
        },
        h4: {
            fontFamily: "'Lato', sans-serif",
        },
        h5: {
            fontFamily: "'Lato', sans-serif",
        },
        h6: {
            fontFamily: "'Lato', sans-serif",
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#23226f', // --civi-dark
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    // Use secodary color for buttons background
                    // Use white for the text
                    backgroundColor: '#6f92b4', // --civi-muted
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#58FFED', // --civi-bright
                        color: '#23226f', // --civi-dark
                    },
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: `
          .comment-tree-line {
            border-left: 1px solid #ccc;
            padding-left: 16px;
            margin-bottom: 16px;
          }
        `,
        },
    },
});

export default theme;
