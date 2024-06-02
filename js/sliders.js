"use strict";

export default function () {
    const $sliders = document.querySelectorAll(".slider");
    const TRANSITION_DURATION = 500;
    const sliders = {};

    for (let $slider of $sliders) sliding($slider);

    function sliding($slider) {
        const $slides = $slider.querySelector("ul");
        if ($slides.children.length < 2) return;

        for (let $slide of $slides.children)
            $slide.style.transition = `margin-left ${TRANSITION_DURATION}ms`;

        let gap =
            $slides.children[1].getBoundingClientRect().x -
            $slides.children[0].getBoundingClientRect().x -
            $slides.children[1].getBoundingClientRect().width;
        gap = (gap * ($slides.children.length - 1)) / $slides.children.length;
        const imgsPerView =
            $slider.getBoundingClientRect().width /
            ($slides.children[0].getBoundingClientRect().width + gap);

        sliders[$slider.id] = {
            position: 0,
            maxPosition: $slides.children.length / imgsPerView - 1
        };

        $slider.addEventListener("click", (e) => {
            if (e.target.parentElement.matches(".arrow-left")) {
                previous($slides, $slider.id);
            } else if (e.target.parentElement.matches(".arrow-right")) {
                next($slides, $slider.id);
            }
        });
    }

    function previous($slides, id) {
        move($slides, -0.5, id);
    }

    function next($slides, id) {
        move($slides, 0.5, id);
    }

    function move($slides, dir, id) {
        if (sliders[id].moving) return;

        sliders[id].position = Math.min(
            Math.max(sliders[id].position + dir, 0),
            sliders[id].maxPosition
        );
        sliders[id].moving = true;

        const $first = $slides.firstElementChild;
        $first.style.marginLeft = `${-sliders[id].position * 100}%`;

        setTimeout(() => {
            sliders[id].moving = false;
        }, TRANSITION_DURATION);
    }
}
