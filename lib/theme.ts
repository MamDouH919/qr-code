// src/theme.ts
import { createTheme } from '@mui/material/styles';

import { Cairo } from "next/font/google";

// Import Cairo font from Google Fonts via Next.js
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export default function getTheme({
  primaryColor,
  secondaryColor,
  dir,
  backgroundDefault = "#000",
  backgroundPaper = "#222426",
}: {
  primaryColor: string;
  secondaryColor: string;
  dir: "ltr" | "rtl"
  backgroundDefault?: string;
  backgroundPaper?: string;
}) {
  return createTheme({
    direction: dir,
    cssVariables: true,
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            fontSize: '16px',
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          // The props to apply
          disableRipple: false, // No more ripple, on the whole application 💣!
        },
      },
      MuiIcon: {
        styleOverrides: {
          root: {
            fontFamily: "'Material Icons Outlined' !important",
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            textTransform: "capitalize",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "0 16px",
            maxHeight: "45px",
            height: "45px",
            whiteSpace: "nowrap",
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          variant: "filled",
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",

            // Tailwind shadow-sm
            boxShadow:
              "0 1px 3px 0 #0000001a, 0 1px 2px -1px #0000001a",

            // Tailwind border
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "rgba(0,0,0,0.1)", // Tailwind default = #e5e7eb or using border-gray-200
          },
        },

        defaultProps: {
          elevation: 0, // important to disable MUI default shadow
        },
      },
      // MuiFormControl: {
      //   styleOverrides: {
      //     root: {
      //       "& label ,& input ,& .MuiSelect-select": {},
      //     },
      //   },
      // },
      MuiTextField: {
        defaultProps: {
          size: "small",
        },
      },
    },

    palette: {
      mode: "dark",
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
      background: {
        default: backgroundDefault,
        paper: backgroundPaper,
      },
    },

    typography: {
      fontFamily: cairo.style.fontFamily,
      fontSize: 12.5,
    },
  });
}
