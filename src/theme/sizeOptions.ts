enum ESizeUnits {
  PIXELS = "PIXELS",
  REMS = "REMS",
}

enum ESizes {
  X_SMALL = "X_SMALL",
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  X_LARGE = "X_LARGE",
  XX_LARGE = "XX_LARGE",
}

// Option to control the default SIZE unit
const DEFAULT_SIZE_UNIT: ESizeUnits = ESizeUnits.PIXELS;

export const SIZE_MAP_PIXELS: Record<ESizes, string> = {
  [ESizes.X_SMALL]: "14px",
  [ESizes.SMALL]: "16px",
  [ESizes.MEDIUM]: "18px",
  [ESizes.LARGE]: "24px",
  [ESizes.X_LARGE]: "32px",
  [ESizes.XX_LARGE]: "64px",
} as const;

export const SIZE_MAP_REMS: Record<ESizes, string> = {
  [ESizes.X_SMALL]: "0.875rem",
  [ESizes.SMALL]: "1rem",
  [ESizes.MEDIUM]: "1.17rem",
  [ESizes.LARGE]: "1.5rem",
  [ESizes.X_LARGE]: "2rem",
  [ESizes.XX_LARGE]: "4rem",
} as const;

export const SIZE =
  DEFAULT_SIZE_UNIT === ESizeUnits.PIXELS ? SIZE_MAP_PIXELS : SIZE_MAP_REMS;
