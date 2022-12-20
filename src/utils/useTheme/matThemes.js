import { createTheme } from '@mui/material/styles';

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
    },
});
const liveLaughLoveTheme = createTheme({
    typography: {
        fontFamily: 'Comic Neue'
    },
    palette: {
        primary: {
            main: '#57451C',
            contrastText: "#fff",
        },
        secondary: {
            main: '#F400F4',
        },
    },
});

export const matThemes = { defaultTheme, roseTheme, eightiesTheme, tropicTheme, liveLaughLoveTheme };
