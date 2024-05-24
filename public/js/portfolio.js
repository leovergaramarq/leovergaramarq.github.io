"use strict";

import {
    projects as projectsAll,
    research as researchAll
} from "./contents/portfolio.contents.js";
import { hasAncestor } from "./utils.js";

export default function () {
    const projects = projectsAll.filter(({ hide }) => !hide);
    const research = researchAll.filter(({ hide }) => !hide);

    const projectsPerPage = 4;
    const numPages = Math.ceil(projects.length / projectsPerPage);
    let currentPage = 0;

    displayProjects();
    displayResearch();

    setupArrows();

    function displayProjects() {
        // TODO: use tags

        const $portfolioProjects = document.querySelector(
            "#portfolio .portfolio-projects"
        );
        let $ul = $portfolioProjects.querySelector("ul");

        if ($ul) {
            $portfolioProjects.removeChild($ul);
            $ul = null;
        }

        const $h3 = $portfolioProjects.querySelector("h3");

        const html = projectsAll
            .slice(
                currentPage * projectsPerPage,
                currentPage * projectsPerPage + projectsPerPage
            )
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

        $ul = document.createElement("ul");
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

    function setupArrows() {
        const $projectsPagination = document.querySelector(
            "#portfolio .portfolio-projects .portfolio-projects__pagination"
        );
        const $arrows = $projectsPagination.querySelectorAll(".arrow");
        const $page = $projectsPagination.querySelector(
            ".portfolio-projects__page"
        );

        if (currentPage === 0) {
            $arrows[0].classList.add("disabled");
        }
        if (currentPage === numPages - 1) {
            $arrows[1].classList.add("disabled");
        }

        $page.textContent = `${currentPage + 1} / ${numPages}`;

        $projectsPagination.addEventListener("click", (e) => {
            if (hasAncestor(e.target, $arrows[0], $projectsPagination)) {
                currentPage = Math.max(currentPage - 1, 0);
                $page.textContent = `${currentPage + 1} / ${numPages}`;

                displayProjects();

                if (currentPage === 0) {
                    $arrows[0].classList.add("disabled");
                } else if ($arrows[1].classList.contains("disabled")) {
                    $arrows[1].classList.remove("disabled");
                }
            } else if (hasAncestor(e.target, $arrows[1], $projectsPagination)) {
                currentPage = Math.min(currentPage + 1, numPages - 1);
                $page.textContent = `${currentPage + 1} / ${numPages}`;

                displayProjects();

                if (currentPage === numPages - 1) {
                    $arrows[1].classList.add("disabled");
                } else if ($arrows[0].classList.contains("disabled")) {
                    $arrows[0].classList.remove("disabled");
                }
            }
        });
    }
}
