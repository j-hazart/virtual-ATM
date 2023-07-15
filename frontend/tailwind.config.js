/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EDF1F4",
        secondary: "#26282B",
        tertiary: "#AAB1B6",
        hl: "#fff",
        sd: "#cccfd2",
        screen: "#BBC9B1",
      },
      boxShadow: {
        box: "18px 18px 30px #cccfd2",
        card: "20px 20px 60px #c9cdcf,-20px -20px 60px #ffffff",
        neo: "inset 3px 3px 5px #fff,3px 3px 5px #cccfd2",
        "neo-plus": "inset 9px 9px 15px #fff,9px 9px 15px #cccfd2",
        neo_bound:
          "-2px -2px 2px #cccfd2,inset 3px 3px 5px #fff,inset -3px -3px 3px #cccfd2,2px 2px 2px #c0c0c0, 9px 9px 15px #cccfd2",
        neo_bound_red_inset:
          "inset 7px 7px 15px #9f1818,inset -7px -7px 15px #d32020",
        neo_bound_green_inset:
          "inset 7px 7px 15px #126e34,inset -7px -7px 15px #189246",
        neo_bound_red:
          "-2px -2px 2px #cccfd2,inset 3px 3px 5px #d32020,inset -3px -3px 3px #9f1818,2px 2px 2px #c0c0c0, 9px 9px 15px #cccfd2",
        neo_bound_green:
          "-2px -2px 2px #cccfd2,inset 3px 3px 5px #189246,inset -3px -3px 3px #126e34,2px 2px 2px #c0c0c0, 9px 9px 15px #cccfd2",
        neo_inset: "inset -3px -3px 5px #fff,inset 3px 3px 5px #cccfd2",
        neo_screen:
          "inset 10px 10px 20px #9fab96,inset -10px -10px 20px #d7e7cc",
        in: "inset 3px 3px 8px #26282B50,inset -3px -3px 8px #ffffff35 ",
        test: "inset 2px 2px 2px white,0 0 2px #000000,inset -2px -2px 2px #cccfd2",
      },
    },
  },
  plugins: [],
};
