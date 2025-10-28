/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // --- ¡AÑADE ESTA SECCIÓN! ---
      colors: {
        primary: "#1D9BF0", // Este es el azul de Twitter/X
        "primary-hover": "#1A8CD8", // Un tono más oscuro para el hover
      },
      // --- FIN DE LA SECCIÓN ---
    },
  },
  plugins: [],
};
