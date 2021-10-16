module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#6D28D9",
      secondary: "#5B21B6",
      danger: "#DC2626",
      light_gray: "#E5E7EB",
      dark: "#111827",
      light: "#F9FAFB",
      gray: "#4B5563",
      blue: "#1D4ED8",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
