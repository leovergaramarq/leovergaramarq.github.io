import mediaQueries from "./mediaQueries.js";
import navMenu from "./navMenu.js";
import about from "./about.js";
import portfolio from "./portfolio.js";

window.addEventListener("DOMContentLoaded", () => {
    mediaQueries();
    navMenu();
    about();
    portfolio();
});
