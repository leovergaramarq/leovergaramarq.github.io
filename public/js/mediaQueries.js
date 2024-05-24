"use strict";

import { hasAncestor, getHash } from "./utils.js";

export default function mediaQueries() {
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
        if (mediumMQ.matches && Math.abs(swipeStartY - swipeEndY) < 20) {
            const hash = getHash();

            if (swipeStartX - swipeEndX > 30) {
                if (!$aside.hasAttribute("hidden-left"))
                    $aside.setAttribute("hidden-left", "");
                else {
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
                }
            } else if (
                swipeStartX - swipeEndX < -30 &&
                e.target !== $aside &&
                !hasAncestor(e.target, $aside)
            ) {
                if (swipeStartX < 30) {
                    if ($aside.hasAttribute("hidden-left"))
                        $aside.removeAttribute("hidden-left");
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
    });

    document.addEventListener("click", (e) => {
        if (
            mediumMQ.matches &&
            !$aside.hasAttribute("hidden-left") &&
            e.target !== $aside &&
            !hasAncestor(e.target, $aside)
        ) {
            $aside.setAttribute("hidden-left", "");
        }
    });
}

function handleSmallMQ(_) {}

function handleMediumMQ(e) {
    if (e.matches) {
        if (picIsLast()) $homeHi.insertAdjacentElement("afterend", $homePic);
    } else {
    }
}

function handleLargeMQ(e) {
    if (e.matches) {
        if ($homeHi.classList.contains("hr-left"))
            $homeHi.classList.remove("hr-left");
        //
        if (!picIsLast())
            $homeContent.insertAdjacentElement("beforeend", $homePic);
    } else {
        if (!$homeHi.classList.contains("hr-left"))
            $homeHi.classList.add("hr-left");
    }
}

function picIsLast() {
    return $homePic.nextElementSibling === null;
}

const $aside = document.querySelector("aside");
const $homeHi = document.querySelector(".home__greet");
const $homePic = document.querySelector(".home__pic");
const $homeContent = document.querySelector(".home__content");
const $navMenuOptions = {
    home: $aside.querySelector('ul li a[href="#home"]'),
    about: $aside.querySelector('ul li a[href="#about"]'),
    portfolio: $aside.querySelector('ul li a[href="#portfolio"]'),
    contact: $aside.querySelector('ul li a[href="#contact"]')
};

let swipeStartX, swipeStartY;
let swipeEndX, swipeEndY;
