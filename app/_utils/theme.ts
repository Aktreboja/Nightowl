import { createSystem, defaultConfig } from '@chakra-ui/react';

// Custom theme configuration that integrates with Tailwind CSS
export const customTheme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        // Primary colors
        primary: {
          50: { value: 'hsl(var(--primary-50))' },
          100: { value: 'hsl(var(--primary-100))' },
          200: { value: 'hsl(var(--primary-200))' },
          300: { value: 'hsl(var(--primary-300))' },
          400: { value: 'hsl(var(--primary-400))' },
          500: { value: 'hsl(var(--primary-500))' },
          600: { value: 'hsl(var(--primary-600))' },
          700: { value: 'hsl(var(--primary-700))' },
          800: { value: 'hsl(var(--primary-800))' },
          900: { value: 'hsl(var(--primary-900))' },
          950: { value: 'hsl(var(--primary-950))' },
        },
        // Secondary colors
        secondary: {
          50: { value: 'hsl(var(--secondary-50))' },
          100: { value: 'hsl(var(--secondary-100))' },
          200: { value: 'hsl(var(--secondary-200))' },
          300: { value: 'hsl(var(--secondary-300))' },
          400: { value: 'hsl(var(--secondary-400))' },
          500: { value: 'hsl(var(--secondary-500))' },
          600: { value: 'hsl(var(--secondary-600))' },
          700: { value: 'hsl(var(--secondary-700))' },
          800: { value: 'hsl(var(--secondary-800))' },
          900: { value: 'hsl(var(--secondary-900))' },
          950: { value: 'hsl(var(--secondary-950))' },
        },
        // Accent colors
        accent: {
          50: { value: 'hsl(var(--accent-50))' },
          100: { value: 'hsl(var(--accent-100))' },
          200: { value: 'hsl(var(--accent-200))' },
          300: { value: 'hsl(var(--accent-300))' },
          400: { value: 'hsl(var(--accent-400))' },
          500: { value: 'hsl(var(--accent-500))' },
          600: { value: 'hsl(var(--accent-600))' },
          700: { value: 'hsl(var(--accent-700))' },
          800: { value: 'hsl(var(--accent-800))' },
          900: { value: 'hsl(var(--accent-900))' },
          950: { value: 'hsl(var(--accent-950))' },
        },
        // Destructive colors
        destructive: {
          50: { value: 'hsl(var(--destructive-50))' },
          100: { value: 'hsl(var(--destructive-100))' },
          200: { value: 'hsl(var(--destructive-200))' },
          300: { value: 'hsl(var(--destructive-300))' },
          400: { value: 'hsl(var(--destructive-400))' },
          500: { value: 'hsl(var(--destructive-500))' },
          600: { value: 'hsl(var(--destructive-600))' },
          700: { value: 'hsl(var(--destructive-700))' },
          800: { value: 'hsl(var(--destructive-800))' },
          900: { value: 'hsl(var(--destructive-900))' },
          950: { value: 'hsl(var(--destructive-950))' },
        },
        // Semantic colors
        background: { value: 'hsl(var(--background))' },
        foreground: { value: 'hsl(var(--foreground))' },
        card: { value: 'hsl(var(--card))' },
        'card-foreground': { value: 'hsl(var(--card-foreground))' },
        popover: { value: 'hsl(var(--popover))' },
        'popover-foreground': { value: 'hsl(var(--popover-foreground))' },
        muted: { value: 'hsl(var(--muted))' },
        'muted-foreground': { value: 'hsl(var(--muted-foreground))' },
        border: { value: 'hsl(var(--border))' },
        input: { value: 'hsl(var(--input))' },
        ring: { value: 'hsl(var(--ring))' },
      },
      // Border radius tokens
      radii: {
        none: { value: '0px' },
        sm: { value: 'calc(var(--radius) - 4px)' },
        base: { value: 'calc(var(--radius) - 2px)' },
        md: { value: 'calc(var(--radius) - 2px)' },
        lg: { value: 'var(--radius)' },
        xl: { value: 'calc(var(--radius) + 4px)' },
        '2xl': { value: 'calc(var(--radius) + 8px)' },
        '3xl': { value: 'calc(var(--radius) + 12px)' },
        full: { value: '9999px' },
      },
      // Spacing tokens
      spacing: {
        px: { value: '1px' },
        0: { value: '0px' },
        0.5: { value: '0.125rem' },
        1: { value: '0.25rem' },
        1.5: { value: '0.375rem' },
        2: { value: '0.5rem' },
        2.5: { value: '0.625rem' },
        3: { value: '0.75rem' },
        3.5: { value: '0.875rem' },
        4: { value: '1rem' },
        5: { value: '1.25rem' },
        6: { value: '1.5rem' },
        7: { value: '1.75rem' },
        8: { value: '2rem' },
        9: { value: '2.25rem' },
        10: { value: '2.5rem' },
        11: { value: '2.75rem' },
        12: { value: '3rem' },
        14: { value: '3.5rem' },
        16: { value: '4rem' },
        20: { value: '5rem' },
        24: { value: '6rem' },
        28: { value: '7rem' },
        32: { value: '8rem' },
        36: { value: '9rem' },
        40: { value: '10rem' },
        44: { value: '11rem' },
        48: { value: '12rem' },
        52: { value: '13rem' },
        56: { value: '14rem' },
        60: { value: '15rem' },
        64: { value: '16rem' },
        72: { value: '18rem' },
        80: { value: '20rem' },
        96: { value: '24rem' },
      },
      // Font size tokens
      fontSizes: {
        xs: { value: '0.75rem' },
        sm: { value: '0.875rem' },
        base: { value: '1rem' },
        lg: { value: '1.125rem' },
        xl: { value: '1.25rem' },
        '2xl': { value: '1.5rem' },
        '3xl': { value: '1.875rem' },
        '4xl': { value: '2.25rem' },
        '5xl': { value: '3rem' },
        '6xl': { value: '3.75rem' },
        '7xl': { value: '4.5rem' },
        '8xl': { value: '6rem' },
        '9xl': { value: '8rem' },
      },
      // Font weight tokens
      fontWeights: {
        thin: { value: '100' },
        extralight: { value: '200' },
        light: { value: '300' },
        normal: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
        extrabold: { value: '800' },
        black: { value: '900' },
      },
      // Line height tokens
      lineHeights: {
        none: { value: '1' },
        tight: { value: '1.25' },
        snug: { value: '1.375' },
        normal: { value: '1.5' },
        relaxed: { value: '1.625' },
        loose: { value: '2' },
      },
      // Letter spacing tokens
      letterSpacings: {
        tighter: { value: '-0.05em' },
        tight: { value: '-0.025em' },
        normal: { value: '0em' },
        wide: { value: '0.025em' },
        wider: { value: '0.05em' },
        widest: { value: '0.1em' },
      },
      // Shadow tokens
      shadows: {
        xs: { value: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
        sm: {
          value:
            '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
        base: {
          value:
            '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
        md: {
          value:
            '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        },
        lg: {
          value:
            '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        },
        xl: { value: '0 25px 50px -12px rgb(0 0 0 / 0.25)' },
        '2xl': { value: '0 25px 50px -12px rgb(0 0 0 / 0.25)' },
        inner: { value: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)' },
        none: { value: 'none' },
      },
      // Z-index tokens
      zIndices: {
        hide: { value: '-1' },
        auto: { value: 'auto' },
        base: { value: '0' },
        docked: { value: '10' },
        dropdown: { value: '1000' },
        sticky: { value: '1100' },
        banner: { value: '1200' },
        overlay: { value: '1300' },
        modal: { value: '1400' },
        popover: { value: '1500' },
        skipLink: { value: '1600' },
        toast: { value: '1700' },
        tooltip: { value: '1800' },
      },
    },
    semanticTokens: {
      colors: {
        // Semantic color mappings
        bg: {
          canvas: { value: '{colors.background}' },
          default: { value: '{colors.background}' },
          subtle: { value: '{colors.muted}' },
          muted: { value: '{colors.muted}' },
          emphasized: { value: '{colors.accent}' },
          inverted: { value: '{colors.foreground}' },
        },
        fg: {
          default: { value: '{colors.foreground}' },
          muted: { value: '{colors.muted-foreground}' },
          subtle: { value: '{colors.muted-foreground}' },
          inverted: { value: '{colors.background}' },
        },
        border: {
          default: { value: '{colors.border}' },
          emphasized: { value: '{colors.border}' },
          subtle: { value: '{colors.border}' },
        },
        accent: {
          default: { value: '{colors.primary.500}' },
          emphasized: { value: '{colors.primary.600}' },
          fg: { value: '{colors.primary.foreground}' },
        },
      },
    },
    recipes: {
      // Button recipe with Tailwind-compatible styles
      button: {
        base: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          whiteSpace: 'nowrap',
          borderRadius: 'md',
          fontSize: 'sm',
          fontWeight: 'medium',
          transition: 'colors',
          focusVisible: {
            outline: '2px solid transparent',
            outlineOffset: '2px',
            boxShadow: '0 0 0 2px {colors.ring}',
          },
          disabled: {
            pointerEvents: 'none',
            opacity: '0.5',
          },
        },
        variants: {
          variant: {
            solid: {
              bg: 'primary.500',
              color: 'primary.foreground',
              _hover: {
                bg: 'primary.600',
              },
            },
            outline: {
              border: '1px solid',
              borderColor: 'border',
              bg: 'background',
              _hover: {
                bg: 'accent',
                color: 'accent.foreground',
              },
            },
            ghost: {
              _hover: {
                bg: 'accent',
                color: 'accent.foreground',
              },
            },
            link: {
              color: 'primary.500',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              _hover: {
                textDecoration: 'underline',
              },
            },
          },
          size: {
            sm: {
              height: '9',
              paddingX: '3',
              fontSize: 'sm',
            },
            md: {
              height: '10',
              paddingX: '4',
              paddingY: '2',
            },
            lg: {
              height: '11',
              paddingX: '8',
              fontSize: 'sm',
            },
            icon: {
              height: '10',
              width: '10',
            },
          },
        },
        defaultVariants: {
          variant: 'solid',
          size: 'md',
        },
      },
      // Input recipe
      input: {
        base: {
          display: 'flex',
          height: '10',
          width: 'full',
          borderRadius: 'md',
          border: '1px solid',
          borderColor: 'border',
          bg: 'background',
          paddingX: '3',
          paddingY: '2',
          fontSize: 'sm',
          transition: 'colors',
          _placeholder: {
            color: 'muted.foreground',
          },
          focusVisible: {
            outline: '2px solid transparent',
            outlineOffset: '2px',
            boxShadow: '0 0 0 2px {colors.ring}',
          },
          disabled: {
            cursor: 'not-allowed',
            opacity: '0.5',
          },
        },
      },
      // Card recipe
      card: {
        base: {
          borderRadius: 'lg',
          border: '1px solid',
          borderColor: 'border',
          bg: 'card',
          color: 'card.foreground',
          boxShadow: 'sm',
        },
        variants: {
          variant: {
            elevated: {
              boxShadow: 'md',
            },
            outline: {
              boxShadow: 'none',
            },
          },
        },
        defaultVariants: {
          variant: 'outline',
        },
      },
    },
  },
});

export default customTheme;
