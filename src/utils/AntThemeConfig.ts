import { ThemeConfig } from "antd";

export const ANT_CUSTOM_THEME: ThemeConfig = {
  // cssVar: true,
  token: {
    size: 14,
    borderRadius: 6,
    colorPrimary: "#7047EB",
    controlHeight: 40,
    fontWeightStrong: 700,
    fontSizeHeading1: 94,
    fontSizeHeading2: 58,
    fontSizeHeading3: 46,
    fontSizeHeading4: 34,
    fontSizeHeading5: 24,
    fontSizeLG: 20,
    fontSizeSM: 16,
    fontSizeXL: 24,
    lineHeight: 1.17,
    fontFamily: "'Kode Mono', monospace",
  },
  components: {
    Button: {
      colorBorder: "rgba(255, 255, 255, 0.20)",
    },
    Input: {
      colorBorder: "rgba(255, 255, 255, 0.20)",
    },
    Menu: {
      horizontalItemBorderRadius: 12,
    },
  },
};
