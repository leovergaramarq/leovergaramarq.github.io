"use strict";

import { hasAncestor as hasAncestorOrEquals, getHash } from "./utils.js";

export default function () {
    const $main = document.querySelector("main");
    const $aside = document.querySelector("aside");
    const $footer = document.querySelector("footer");
    const $homeHi = document.querySelector(".home__greet");
    const $homePic = document.querySelector(".home__pic");
    const $homeContent = document.querySelector(".home__content");
    const $navMenuOptions = {
        home: $aside.querySelector('ul li a[href="#home"]'),
        about: $aside.querySelector('ul li a[href="#about"]'),
        portfolio: $aside.querySelector('ul li a[href="#portfolio"]'),
        contact: $aside.querySelector('ul li a[href="#contact"]')
    };

    let swipeStartX;
    let swipeStartY;
    let swipeEndX;
    let swipeEndY;

    const largeMQ = window.matchMedia("(min-width: 901px)");
    largeMQ.addEventListener("change", handleLargeMQ);
    handleLargeMQ(largeMQ);

    // const mediumMQ = window.matchMedia('(min-width: 451px) and (max-width: 900px)')
    const mediumMQ = window.matchMedia("(max-width: 900px)");
    mediumMQ.addEventListener("change", handleMediumMQ);
    handleMediumMQ(mediumMQ);

    const smallMQ = window.matchMedia("(max-width: 450px)");
    smallMQ.addEventListener("change", handleSmallMQ);
    handleSmallMQ(smallMQ);

    document.body.addEventListener("touchstart", (e) => {
        swipeStartX = e.touches[0].clientX;
        swipeStartY = e.touches[0].clientY;
    });

    document.body.addEventListener("touchmove", (e) => {
        swipeEndX = e.touches[0].clientX;
        swipeEndY = e.touches[0].clientY;
    });

    document.body.addEventListener("touchend", (e) => {
        if (
            !hasAncestorOrEquals(e.target, $aside) &&
            !hasAncestorOrEquals(e.target, $footer)
        ) {
            let swipeXMin;
            let swipeYMax;

            if (smallMQ.matches) {
                swipeXMin = 60;
                swipeYMax = 20;
            } else if (mediumMQ.matches) {
                swipeXMin = 80;
                swipeYMax = 30;
            } else {
                swipeXMin = 100;
                swipeYMax = 50;
            }

            if (
                Math.abs(swipeStartY - swipeEndY) <= swipeYMax &&
                Math.abs(swipeStartX - swipeEndX) >= swipeXMin
            ) {
                const hash = getHash();

                if (swipeStartX > swipeEndX) {
                    switch (hash) {
                        case "home":
                            $navMenuOptions.about.click();
                            break;
                        case "about":
                            $navMenuOptions.portfolio.click();
                            break;
                        case "portfolio":
                            $navMenuOptions.contact.click();
                    }
                } else {
                    switch (hash) {
                        case "about":
                            $navMenuOptions.home.click();
                            break;
                        case "portfolio":
                            $navMenuOptions.about.click();
                            break;
                        case "contact":
                            $navMenuOptions.portfolio.click();
                    }
                }
            }
        }

        swipeStartX = null;
        swipeStartY = null;
        swipeEndX = null;
        swipeEndY = null;
    });

    document.body.addEventListener("click", (e) => {
        if (
            mediumMQ.matches &&
            !$aside.hasAttribute("hidden-left") &&
            e.target !== $aside &&
            !hasAncestorOrEquals(e.target, $aside)
        ) {
            $aside.setAttribute("hidden-left", "");
        }
    });

    function handleSmallMQ(_) {}

    function handleMediumMQ(e) {
        if (e.matches) {
            if ($homeHi.classList.contains("hr-right")) {
                $homeHi.classList.remove("hr-right");
            }

            if (picIsLast()) {
                $homeHi.insertAdjacentElement("afterend", $homePic);
            }
            if (!$aside.hasAttribute("hidden-left")) {
                $aside.setAttribute("hidden-left", "");
            }
            if ($footer.hasAttribute("hidden-bottom")) {
                $footer.removeAttribute("hidden-bottom");
            }
            $main.style.height = "calc(100vh - var(--footer-height))";
        }
    }

    function handleLargeMQ(e) {
        if (e.matches) {
            if ($aside.hasAttribute("hidden-left")) {
                $aside.removeAttribute("hidden-left");
            }
            if (!$footer.hasAttribute("hidden-bottom")) {
                $footer.setAttribute("hidden-bottom", "");
            }

            if (!picIsLast()) {
                $homeContent.insertAdjacentElement("beforeend", $homePic);
            }

            $main.style.height = "100vh";
        }
    }

    function picIsLast() {
        return $homePic.nextElementSibling === null;
    }
}
