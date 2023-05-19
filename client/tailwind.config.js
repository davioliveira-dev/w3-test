/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      accentColor: "#2EC4B6",
      colors: {
        taskCompleted: "#17E0BC",
        taskUncompleted: "#E1E1E1",
        primary: "#2EC4B6",
        default: "#141315",
        trash: "#FF3C52",
      },
    },
  },
  plugins: [],
};
