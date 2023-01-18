/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clrprimary1: "#453227",
        clrprimary2: "#5f4435",
        clrprimary3: "#795744",
        clrprimary4: "#936a53",
        /* primary/main color */
        clrprimary5: "#ab7a5f",
        /* lighter shades of primary color */
        clrprimary6: "#b99179",
        clrprimary7: "#c5a491",
        clrprimary8: "#d1b6a8",
        clrprimary9: "#decbc0",
        clrprimary10: "#eaded7",
        /* darkest grey - used for headings */
        clrgrey1: "#102a42",
        clrgrey2: "#243a52",
        clrgrey3: "#324d67",
        clrgrey4: "#48647f",
        /* grey used for paragraphs */
        clrgrey5: "#617d98",
        clrgrey6: "#829ab0",
        clrgrey7: "#9eb2c7",
        clrgrey8: "#bcccdc",
        clrgrey9: "#dae2ec",
        clrgrey10: "#f1f5f8",
        clrreddark: "#ba2626",
        clrredlight: "#e66b6b",
        clrgreendark: "#25bb32",
        clrgreenlight: "#6be675",
        clrblack: "#222"
      },
      gridTemplateColumns: {
        "navbar": "auto minmax(0,1fr) auto",
        "services": "repeat(auto-fit, minmax(360px, 1fr))",
        "form": "1fr auto",
        "info": "125px 1fr",
        "products": "150px 1fr",
        "sort": "auto auto 1fr auto",
        "auto1": "auto 1fr",
        "200px": "200px 1fr"
      },
      maxWidth: {
        "navbar": "1170px"
      },
      animation: {
        'spin-fast': 'spin 0.6s linear infinite',
      },
      gridTemplateRows: {
        "auto": "96px 1fr",
        "nav": "auto 1fr",
      },
      gridTemplateColumns: {
        "task": "1fr 160px",
      }

    },
  },
  plugins: [require('@tailwindcss/forms')],
}
