import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        bg: "#f7f6ff",
        color: "#140342",
      },
      body: {
        fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif",
        backgroundImage:
          "radial-gradient(circle at top, rgba(100,64,251,0.08), transparent 28%), linear-gradient(180deg, #f7f6ff 0%, #ffffff 38%, #f5f3ff 100%)",
      },
      "::selection": {
        background: "#c4b5fd",
        color: "#140342",
      },
    },
  },
  fonts: {
    heading: "'Avenir Next', 'Trebuchet MS', 'Segoe UI', sans-serif",
    body: "'Trebuchet MS', 'Segoe UI', sans-serif",
  },
  colors: {
    brand: {
      50: "#f3efff",
      100: "#ddd2ff",
      200: "#c5b2ff",
      300: "#ab90ff",
      400: "#8c66ff",
      500: "#6440fb",
      600: "#5232e8",
      700: "#3f22c6",
      800: "#2d1596",
      900: "#1a064f",
    },
    ink: {
      900: "#140342",
      700: "#4f547b",
    },
  },
  radii: {
    xl: "18px",
    "2xl": "24px",
  },
  shadows: {
    outline: "0 0 0 3px rgba(100,64,251,0.18)",
    soft: "0 18px 45px rgba(20, 3, 66, 0.08)",
    lifted: "0 24px 60px rgba(20, 3, 66, 0.12)",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "full",
        fontWeight: 600,
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: "white",
            border: "1px solid",
            borderColor: "blackAlpha.100",
            borderRadius: "14px",
            _hover: {
              borderColor: "brand.200",
            },
            _focus: {
              borderColor: "brand.500",
              boxShadow: "0 0 0 3px rgba(100,64,251,0.16)",
              bg: "white",
            },
          },
        },
      },
    },
    Select: {
      variants: {
        filled: {
          field: {
            bg: "white",
            border: "1px solid",
            borderColor: "blackAlpha.100",
            borderRadius: "14px",
            _hover: {
              borderColor: "brand.200",
            },
            _focus: {
              borderColor: "brand.500",
              boxShadow: "0 0 0 3px rgba(100,64,251,0.16)",
              bg: "white",
            },
          },
        },
      },
    },
    Textarea: {
      variants: {
        filled: {
          bg: "white",
          border: "1px solid",
          borderColor: "blackAlpha.100",
          borderRadius: "14px",
          _hover: {
            borderColor: "brand.200",
          },
          _focus: {
            borderColor: "brand.500",
            boxShadow: "0 0 0 3px rgba(100,64,251,0.16)",
            bg: "white",
          },
        },
      },
    },
  },
});

export default theme;
