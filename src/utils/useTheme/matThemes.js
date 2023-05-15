import { createTheme } from '@mui/material/styles';

const common = {
    transparent: {
        main: '#ffffff79',
    },
};

const defaultTheme = createTheme({
    typography: {
        fontFamily: 'Space Grotesk'
    },
    palette: {
        primary: {
            main: '#040E21',
            contrastText: "#fff",
        },
        secondary: {
            main: '#FBBA89',
        },
        ...common,
    },
});
const roseTheme = createTheme({
    typography: {
        fontFamily: 'Sansita'
    },
    palette: {
        primary: {
            main: '#0C7575',
            contrastText: "#fff"
        },
        secondary: {
            main: '#D08858',
        },
        ...common,
    },
});
const eightiesTheme = createTheme({
    typography: {
        fontFamily: 'Sansita'
    },
    palette: {
        primary: {
            main: '#F20587',
            contrastText: "#fff"
        },
        secondary: {
            main: '#05F2DB',
        },
        ...common,
    },
});
const tropicTheme = createTheme({
    typography: {
        fontFamily: 'Changa'
    },
    palette: {
        primary: {
            main: '#183940',
            contrastText: "#fff"
        },
        secondary: {
            main: '#D99E89',
        },
        ...common,
    },
});

export const matThemes = { defaultTheme, roseTheme, eightiesTheme, tropicTheme };
