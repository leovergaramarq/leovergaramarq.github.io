import fetch from "./fetch.js";

export default function () {
    const $form = document.querySelector("#contact-form");

    $form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            name: $form.name.value,
            email: $form.email.value,
            message: $form.message.value,
            copy: $form.copy.checked
        };

        try {
            const { status } = await fetch("/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data,
                timeout: 5000
            });

            if (status === 201) {
                alert("Message sent successfully");
                $form.reset();
            } else {
                alert("An error occurred");
            }
        } catch (err) {
            console.error(err);
        }
    });
}
