// Cal Poly SLO Official Brand Colors & Theme
// https://www.calpoly.edu/marketing/brand-guidelines

export const Colors = {
  // Primary
  green: '#154734',
  gold: '#C69214',

  // Extended palette
  lightGreen: '#1E6B4F',
  darkGreen: '#0F3527',
  deepGreen: '#0A2219',
  lightGold: '#D4A82A',
  paleGold: '#F0D78C',

  // Neutrals
  white: '#FFFFFF',
  offWhite: '#F5F5F0',
  lightGray: '#E8E8E2',
  midGray: '#9A9A90',
  darkGray: '#3A3A35',
  black: '#1A1A1A',

  // UI States
  success: '#2E7D32',
  error: '#C62828',
  overlay: 'rgba(21, 71, 52, 0.85)',
};

export const Typography = {
  fontSizeXS: 11,
  fontSizeSM: 13,
  fontSizeMD: 16,
  fontSizeLG: 20,
  fontSizeXL: 26,
  fontSizeXXL: 34,

  fontWeightRegular: '400' as const,
  fontWeightMedium: '500' as const,
  fontWeightSemiBold: '600' as const,
  fontWeightBold: '700' as const,
  fontWeightExtraBold: '800' as const,

  lineHeightTight: 1.2,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.7,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const BorderRadius = {
  sm: 6,
  md: 12,
  lg: 18,
  xl: 24,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 10,
  },
};
