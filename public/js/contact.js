export default function () {
    const $form = document.querySelector("#contact-form");
    const $btnSubmit = $form.querySelector("button[type=submit]");
    const MB_SIZE_LIMIT = 25;

    $form.addEventListener("submit", async (e) => {
        e.preventDefault();
        $btnSubmit.disabled = true;
        $btnSubmit.classList.add("disabled");
        const originalText = $btnSubmit.textContent;
        $btnSubmit.textContent = "Sending...";

        const data = {
            name: $form.name.value,
            email: $form.email.value,
            message: $form.message.value,
            files: Array.from($form.file.files)
        };

        if (areFilesValid(data.files)) {
            const attachments = await Promise.all(
                data.files.map(async (file) => {
                    const data = await new Promise((res) => {
                        const reader = new FileReader();

                        reader.addEventListener("load", () => {
                            res(reader.result);
                        });

                        reader.readAsDataURL(file);
                    });

                    return {
                        name: file.name,
                        data
                    };
                })
            );

            try {
                const message = await Email.send({
                    SecureToken: "9deebc6a-363f-4fda-a3f3-727b4237b30a",
                    To: "leonardo11vergara11@gmail.com",
                    From: "leonardo11vergara11@gmail.com",
                    Subject: "Your Website Contact Form",
                    Body: `
                        <b>Name:</b> ${data.name}<br>
                        <b>Email:</b> ${data.email}<br>
                        <b>Message:</b><br>
                        ${data.message.replace(/\n/g, "<br>")}
                    `,
                    Attachments: attachments
                });

                console.log(message);
                if (message != "OK") {
                    throw new Error(message);
                }

                $form.reset();

                alert(
                    `Thank you for your message, ${data.name}! I'll get back to you as soon as possible.`
                );
            } catch (err) {
                console.error(err);
                alert(`Sorry! An error occurred\n${err}`);
            }
        } else {
            alert(
                `Please make sure the total file size is less than ${MB_SIZE_LIMIT}MB`
            );
        }

        $btnSubmit.disabled = false;
        $btnSubmit.classList.remove("disabled");
        $btnSubmit.textContent = originalText;
    });

    function areFilesValid(files) {
        if (files.length) {
            const totalFileSize = files.reduce(
                (acc, file) => acc + file.size,
                0
            );

            return totalFileSize <= MB_SIZE_LIMIT * 1024 * 1024;
        }

        return true;
    }
}
