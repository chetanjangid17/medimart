const withMT = require("@material-tailwind/react/utils/withMT");
 
// export default withMT({
  // content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  module.exports = {
  //...
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  daisyui: {
    themes: ['light'],
  },
  plugins: [require("daisyui")],
};
