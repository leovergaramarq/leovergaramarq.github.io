export default function () {
    const $themePicker = document.querySelector("#theme-picker");
    const $body = document.body;

    setInitialTheme();

    $themePicker.addEventListener("click", (e) => {
        const currentTheme = $body.getAttribute("theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        $body.setAttribute("theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });

    function setInitialTheme() {
        const theme = localStorage.getItem("theme");
        if (theme) {
            $body.setAttribute("theme", theme);
        }
    }
}
