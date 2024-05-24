import { projects, research } from "./contents/portfolio.contents.js";

export default function () {
    displayProjects();
    displayResearch();

    function displayProjects() {
        // TODO: add pagination
        // TODO: use tags
        const $h3 = document.querySelector("#portfolio .portfolio-projects h3");

        const html = projects
            .filter(({ hide }) => !hide)
            .map(
                ({
                    authorship,
                    description,
                    img,
                    projectUrl,
                    repoUrl,
                    tags,
                    title,
                    websiteUrl
                }) => `
                    <li>
                        <a
                            href="${websiteUrl || projectUrl || repoUrl}"
                            target="_blank"
                        >
                            <img
                                src="${img}"
                            />
                            <div class="project-content">
                                <div class="project-content__options">
                                    ${
                                        websiteUrl
                                            ? `<span class="anchor" href="${websiteUrl}" target="_blank"><i class="fa-solid fa-globe"></i></span>`
                                            : ""
                                    }
                                    ${
                                        repoUrl
                                            ? `<span class="anchor" href="${repoUrl}" target="_blank"><i class="fa-solid fa-code"></i></span>`
                                            : ""
                                    }
                                    ${
                                        projectUrl
                                            ? `<span class="anchor" href="${projectUrl}" target="_blank"><i class="fa-solid fa-external-link"></i></span>`
                                            : ""
                                    }
                                </div>
                                <div class="project-content__info">
                                    <div class="project-content__title">
                                        ${title}
                                    </div>
                                    <div class="project-content__authorship">
                                        ${authorship}
                                    </div>
                                    <div class="project-content__description">
                                        ${description}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                `
            )
            .join("\n");

        const $ul = document.createElement("ul");
        $ul.innerHTML = html;

        $h3.insertAdjacentElement("afterend", $ul);

        const $anchors = document.querySelectorAll(
            "#portfolio .portfolio-projects .anchor"
        );
        $anchors.forEach(($anchor) => {
            $anchor.addEventListener("click", (e) => {
                e.stopPropagation();

                const url = $anchor.getAttribute("href");
                const target = $anchor.getAttribute("target") || "_self";
                window.open(url, target);
            });
        });
    }

    function displayResearch() {
        const $h3 = document.querySelector("#portfolio .portfolio-research h3");

        const html = research
            .filter(({ hide }) => !hide)
            .map(
                ({ authors, date, lang, title, url }, i) => `
                    <li>
                        <div class="research-content">
                            <div class="research-content__numeral">[${
                                i + 1
                            }]</div>
                            <div class="research-content__info">
                                <span class="research-content__authors">
                                    ${
                                        authors.length > 1
                                            ? authors.slice(0, -1).join(", ") +
                                              " & " +
                                              authors.slice(-1)
                                            : authors.join(", ")
                                    }
                                </span>
                                <span class="research-content__date">
                                    (${date}).
                                </span>
                                <span class="research-content__title">
                                    ${title}.
                                </span>
                                <span class="research-content__url">
                                    Available at:
                                    <a
                                        href="${url}"
                                        target="_blank"
                                    >
                                        ${url}
                                    </a>
                                    in ${lang}.
                                </span>
                            </div>
                        </div>
                    </li>
                `
            )
            .join("\n");

        const $ul = document.createElement("ul");
        $ul.innerHTML = html;

        $h3.insertAdjacentElement("afterend", $ul);
    }
}
