"use strict";

import { hasAncestor, getHash, setHash } from "./utils.js";

export default function () {
    const $menuSide = document.querySelector("aside .nav-menu ul");
    const $menuBottom = document.querySelector("footer .nav-menu ul");
    const $firstSection = document.querySelector("section");

    const TRANSITION_DURATION = 500;
    let navTimeout;

    $firstSection.style.transition = `margin-left ${TRANSITION_DURATION}ms`;

    const onMenuClick = (e) => {
        let $target = e.target;
        const $menu = e.currentTarget;

        if (hasAncestor($target, $menu)) {
            const tagName = $target.tagName.toLowerCase();
            if (tagName === "i") {
                $target = $target.parentElement;
            } else if (tagName === "li") {
                $target = $target.firstElementChild;
            }

            if ($target.tagName.toLowerCase() !== "a") return;

            e.preventDefault();

            if (!navTimeout) {
                selectSection($target.href.split("#")[1]);
            }
        }
    };

    $menuSide.addEventListener("click", onMenuClick);
    $menuBottom.addEventListener("click", onMenuClick);

    const navReference = window.navigation || window;
    navReference.addEventListener("navigate", (e) => {
        if (!navTimeout) {
            const hash = e.destination.url.split("#")[1];
            if (hash) {
                console.log(`Navigating to ${hash}`);
                selectSection(hash);
            }
        }
    });

    selectSection(getHash());

    function selectSection(section) {
        [$menuSide, $menuBottom].forEach(($menu) => {
            const $selectedItem = $menu.querySelector("li[selected]");
            const $toSelect = $menu.querySelector(
                `a[href="#${section}"]`
            ).parentElement;

            if ($selectedItem) {
                if ($selectedItem === $toSelect) return;
                $selectedItem.removeAttribute("selected");
            }
            $toSelect.setAttribute("selected", "");
        });

        slideToSection(section);

        if (navTimeout) {
            clearTimeout(navTimeout);
            navTimeout = null;
        }

        navTimeout = setTimeout(() => {
            setHash(section);
            navTimeout = null;
        }, TRANSITION_DURATION);
    }

    function slideToSection(section) {
        const $menuSideItems = $menuSide.querySelectorAll("li");

        for (let i = 0; i < $menuSideItems.length; i++) {
            if (
                $menuSideItems[i].querySelector("a").href.split("#")[1] ===
                section
            ) {
                $firstSection.style.marginLeft = `-${i * 100}%`;
                break;
            }
        }
    }
}
