"use strict";

import {
    categories,
    skills,
    education,
    experience
} from "./contents/about.contents.js";

export default function () {
    const TRANSITION_DURATION = 300;
    let pointerTimeout;

    const $cat = document.querySelector(".about-skills__cat");
    const $tech = document.querySelector(".about-skills__tech");
    const $edu = document.querySelector(".about-edu");
    const $exp = document.querySelector(".about-exp");
    const $pointer = $cat.querySelector("#cat-pointer");

    configCvDownload();

    displayEducation();
    displayExperience();
    displayCategories();
    displaySkills();

    const $catList = $cat.querySelector("ul");
    const $techLists = $tech.querySelectorAll(".about-skills__tech__list");

    // $pointer.style.transition = `transform ${TRANSITION_DURATION}ms ease-in-out`;
    for (let $li of $catList.children) {
        $li.querySelector(
            "div"
        ).lastElementChild.style.transition = `margin-left ${TRANSITION_DURATION}ms ease-in-out`;
    }

    $catList.addEventListener("mouseover", (e) => {
        const tag = e.target.tagName.toLowerCase();

        if (tag === "div") {
            selectCat(e.target.parentElement);
        } else if (tag === "li") {
            selectCat(e.target);
        }
    });

    let $selectedCat = getFirstWithAttribute($catList.children, "selected");
    if (!$selectedCat) {
        $selectedCat = $catList.firstElementChild;
        $selectedCat.setAttribute("selected", "");
    }
    selectCat($selectedCat);

    function getFirstWithAttribute($elem, attr) {
        for (let $child of $elem) {
            if ($child.hasAttribute(attr)) return $child;
        }
        return null;
    }

    function selectCat($li) {
        const $prevSelectedCat = getFirstWithAttribute(
            $catList.children,
            "selected"
        );
        const $techListShowing = getFirstWithAttribute($techLists, "showing");

        let toShow = false;

        if ($prevSelectedCat) {
            if ($li !== $prevSelectedCat) {
                $prevSelectedCat.removeAttribute("selected");
                $techListShowing?.removeAttribute("showing");

                $li.setAttribute("selected", "");
                toShow = true;

                const $prevSelectedCatDiv =
                    $prevSelectedCat.querySelector("div");

                if ($prevSelectedCatDiv.firstChild === $pointer) {
                    $prevSelectedCatDiv.removeChild($pointer);
                }
            }

            if (pointerTimeout) {
                clearTimeout(pointerTimeout);
                pointerTimeout = null;
            }

            pointerTimeout = setTimeout(() => {
                if ($pointer.classList.contains("nodisplay")) {
                    $pointer.classList.remove("nodisplay");
                }

                $li.querySelector("div").insertAdjacentElement(
                    "afterbegin",
                    $pointer
                );

                pointerTimeout = null;
            }, TRANSITION_DURATION / 2);
        } else {
            $li.setAttribute("selected", "");
            toShow = true;
        }

        if (toShow) {
            const id = $li.getAttribute("for");
            for (let $techList of $techLists) {
                if ($techList.id === id) {
                    $techList.setAttribute("showing", "");
                    break;
                }
            }
        }
    }

    function displayEducation() {
        const html = education
            .map(
                ({ degree, details, on, period, progress, img }) => `
                    <li class="edu">
                        <div class="edu-left">
                            <div class="edu-degree">
                                ${degree}
                            </div>
                            <div class="edu-period">
                                ${period.join(" - ")}
                            </div>
                            ${
                                details.length
                                    ? `
                                <ul class="edu-details">
                                    ${details
                                        .map(
                                            (detail) => `
                                    <li>
                                        <i class="fa-solid fa-check"></i>
                                        <span>${detail}</span>
                                    </li>
                                            `
                                        )
                                        .join("")}
                                </ul>
                                    `
                                    : ""
                            }
                        </div>
                        <div class="edu-right">
                            <div class="edu-on">
                                <span>${on}</span>
                                ${img ? `<img src="${img}" alt="${on}" />` : ""}
                            </div>
                            ${
                                progress[1] > 0 && progress[0] < progress[1]
                                    ? `
                                <div class="edu-progress" title="Progress">
                                    <span style="width: ${
                                        100 * (progress[0] / progress[1])
                                    }%;"></span>
                                </div>
                                    `
                                    : ""
                            }
                        </div>
                    </li>
                `
            )
            .join("\n");

        const $ul = document.createElement("ul");
        $ul.innerHTML = html;

        $edu.insertAdjacentElement("beforeend", $ul);
    }

    function displayExperience() {
        const html = experience
            .map(
                ({ company, description, img, location, period, title }) => `
                    <li class="exp">
                        <div class="exp-left">
                            <div class="exp-title">
                                ${title}
                            </div>
                            <div class="exp-placetime">
                                <div class="period">${period.join(" - ")}</div>
                                <div class="exp-location">
                                    <i class="fa-solid fa-map-marker-alt"></i>
                                    <span>${location}</span>
                                </div>
                            </div>
                            <div class="exp-description">
                                ${description}
                            </div>
                        </div>
                        <div class="exp-right">
                            <div class="exp-company">
                                <span>${company}</span>
                                ${
                                    img
                                        ? `
                                    <img src="${img}" alt="${company}" />
                                        `
                                        : ""
                                }
                            </div>
                        </div>
                    </li>
                `
            )
            .join("\n");

        const $ul = document.createElement("ul");
        $ul.innerHTML = html;

        $exp.insertAdjacentElement("beforeend", $ul);
    }

    function displayCategories() {
        const html = categories
            .map(
                ({ htmlFor, title }, i) => `
					<li for="${htmlFor}" ${i === 0 ? "selected" : ""}>
						<div><span>${title}</span></div>
					</li>
				`
            )
            .join("\n");

        const $ul = document.createElement("ul");
        $ul.innerHTML = html;

        $cat.insertAdjacentElement("beforeend", $ul);
    }

    function displaySkills() {
        const html = categories
            .map(
                ({ htmlFor }, i) => `
                    <li
                        id="${htmlFor}"
                        class="about-skills__tech__list"
                        ${i === 0 ? "showing" : ""}
                    >
                        <ul>
                            ${skills[htmlFor]
                                .map(({ title, level, icon }) => {
                                    return `
                                    <li title="${title}">
                                        <div class="skill-lvl"><span>${level}</span></div>
                                        <img src="${icon}" alt="${title}" />
                                    </li>
                                `;
                                })
                                .join("")}
                        </ul>
                    </li>
                `
            )
            .join("\n");

        const $ul = document.createElement("ul");
        $ul.innerHTML = html;

        $tech.insertAdjacentElement("beforeend", $ul);
    }

    function configCvDownload() {
        const $cvDownloadGroup = document.querySelector(
            ".cv-zone .cv-download-group"
        );
        const $cvDownload = $cvDownloadGroup.querySelector("button a");
        const $select = $cvDownloadGroup.querySelector("select");

        $select.addEventListener("change", (e) => {
            const value = e.target.value;
            $cvDownload.href = `./assets/pdf/CV_Leonardo_Vergara_${value}.pdf`;
        });
    }
}
