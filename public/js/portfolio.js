import { projects, research } from "./contents/portfolio.contents.js";

export default function () {
    displayProjects();
    // displayResearch();

    // const $projectsUl = document.querySelector(
    //     "#portfolio .portfolio-projects ul"
    // );
    // const $researchUl = document.querySelector(
    //     "#portfolio .portfolio-research ul"
    // );

    function displayProjects() {
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
}
