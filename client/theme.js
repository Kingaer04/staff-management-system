// color design tokens export
export const tokensDark = {
    grey: {
      0: "#000000",
      10: "#141414",
      50: "#292929",
      100: "#3d3d3d",
      200: "#525252",
      300: "#666666",
      400: "#858585",
      500: "#a3a3a3",
      600: "#c2c2c2",
      700: "#e0e0e0",
      800: "#f0f0f0",
      900: "#f6f6f6",
      1000: "#ffffff",
    },
    primary: {
      // blue
      100: "#87ceeb",
      200: "#4169e1",
      300: "#1e90ff",
      400: "#00bfff",
      500: "#00008b",
      600: "#0000ff",
      700: "#37a1bd", // main
      800: "#dbdbdb",
      900: "#c9c9c9",
    },
    secondary: {
      // purple
      50: "#da70d6",
      100: "#d8bfd8",
      200: "#c71585",
      300: "#9370db",
      400: "#8b008b",
      500: "#512381", // main
      600: "#572a85",
      700: "#60368c",
      800: "#800080",
      900: "#ffffff"
    },
  }
  
  // function that reverses the color palette
  function reverseTokens(tokensDark) {
    const reversedTokens = {};
    Object.entries(tokensDark).forEach(([key, val]) => {
      const keys = Object.keys(val);
      const values = Object.values(val);
      const length = keys.length;
      const reversedObj = {};
      for (let i = 0; i < length; i++) {
        if (key === 'secondary' && keys[i] === '900') {
          reversedObj[keys[i]] = tokensDark.primary[300];
        } else if (key === 'primary' && keys[i] === '700') {
          reversedObj[keys[i]] = tokensDark.secondary[900];
        } else {
          reversedObj[keys[i]] = values[length - i - 1];
        }
      }
      reversedTokens[key] = reversedObj;
    });
    return reversedTokens;
  }
  export const tokensLight = reverseTokens(tokensDark);
  
  // mui theme settings
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // palette values for dark mode
              primary: {
                ...tokensDark.primary,
                main: tokensDark.primary[400],
                light: tokensDark.primary[400],
              },
              secondary: {
                ...tokensDark.secondary,
                main: tokensDark.secondary[300],
              },
              neutral: {
                ...tokensDark.grey,
                main: tokensDark.grey[500],
              },
              background: {
                default: tokensDark.secondary[900],
                alt: tokensDark.primary[500],
              },
            }
          : {
              // palette values for light mode
              primary: {
                ...tokensLight.primary,
                main: tokensDark.grey[50],
                light: tokensDark.grey[100],
              },
              secondary: {
                ...tokensLight.secondary,
                main: tokensDark.secondary[600],
                light: tokensDark.secondary[700],
              },
              neutral: {
                ...tokensLight.grey,
                main: tokensDark.grey[500],
              },
              background: {
                default: tokensDark.grey[0],
                alt: tokensDark.grey[50],
              },
            }),
      },
      typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };