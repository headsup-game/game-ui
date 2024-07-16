/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          "100": "#060215",
          "200": "rgba(20, 17, 39, 0.88)",
          "300": "rgba(255, 255, 255, 0.12)",
          "400": "rgba(255, 255, 255, 0.04)",
        },
        "purple-med": "#141127",
        darkslateblue: "#312a5e",
        "background-bg-primary": "#fff",
        "text-txt-primary": "#000",
        "color-background-button-primary-gray-disabled": "#d1d1db",
        darkslategray: "#34304c",
        "color-border-button-outline-normal": "rgba(255, 255, 255, 0.2)",
        darkblue: "#4816a0",
        darkorchid: "rgba(201, 82, 244, 0.86)",
        "white-primary": "#f9fafb",
        "color-text-secondary": "#6c6c89",
        "color-background-accent-orange": "#fff2ee",
        "color-text-accent-orange": "#b82e00",
      },
      spacing: {
        "spacing-1": "4px",
        "spacing-2": "8px",
        "spacing-05": "2px",
        "spacing-4": "16px",
      },
      fontFamily: {
        "text-2-strong": "Inter",
        "monument-extended": "'Monument Extended'",
        "r-16": "Manrope",
        "space-grotesk": "'Space Grotesk'",
      },
      borderRadius: {
        "13xl-1": "32.1px",
        "341xl": "360px",
        "radius-border-radius-12": "12px",
        "radius-md": "8px",
        "radius-3xl": "360px",
      },
    },
    fontSize: {
      lg: "18px",
      "29xl": "48px",
      "19xl": "38px",
      "10xl": "29px",
      "5xl": "24px",
      lgi: "19px",
      base: "16px",
      sm: "14px",
      xs: "12px",
      inherit: "inherit",
    },
    screens: {
      mq1575: {
        raw: "screen and (max-width: 1575px)",
      },
      mq1250: {
        raw: "screen and (max-width: 1250px)",
      },
      mq825: {
        raw: "screen and (max-width: 825px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
