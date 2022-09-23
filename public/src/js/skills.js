'use strict';

export default function() {

    $pointer.style.transition = `transform ${TRANSITION_DURATION}ms ease-in-out`;
    for(let $li of $ul.children) {
        $li.style.transition = `margin-left ${TRANSITION_DURATION}ms ease-in-out`;
    }
    
    $ul.addEventListener('mouseover', e => {
        let $target = e.target;
        
        if($target.tagName.toLowerCase() === 'span') {
            $target = $target.parentElement;
            selectCat($target);
        }
    });

    let $selectedCat = getFirstWithAttribute($ul.children, 'selected');
    if(!$selectedCat) {
        $selectedCat = $ul.firstElementChild;
        $selectedCat.setAttribute('selected', '');
    }
    selectCat($selectedCat);
}

function getFirstWithAttribute($elem, attr) {
    for(let $child of $elem) {
        if($child.hasAttribute(attr)) return $child;
    }
    return null;
}

function getElemIndex($elem) {
    const $parent = $elem.parentElement;
    const $children = $parent.children;

    for(let i = 0; i < $children.length; i++) {
        if($children[i] === $elem) return i;
    }
}

function selectCat($li) {
    if(moving) return;

    const $selectedCat = getFirstWithAttribute($ul.children, 'selected');
    const $techListShowing = getFirstWithAttribute($techLists, 'showing');
    
    let toShow = false, toStopShowing = false;

    if($selectedCat) {
        if($li !== $selectedCat) {
            $selectedCat.removeAttribute('selected');
            toStopShowing = true;

            $li.setAttribute('selected', '');
            toShow = true;
        }
    } else {
        $li.setAttribute('selected', '');
        toShow = true;
    }

    const yPointer = $pointer.getBoundingClientRect().y;
    const y0 = $catsSpan[0].getBoundingClientRect().y;

    const min = y0 - yPointer;
    const max = $catsSpan[$catsSpan.length - 1].getBoundingClientRect().y;
    let offset = min;
    if($catsSpan.length > 1) offset += ($catsSpan[1].getBoundingClientRect().y - y0) * getElemIndex($li);

    if($pointer.style.transform) offset += +$pointer.style.transform.match(/\d+/g)[0];

    // offset = Math.min(max, Math.max(min, offset));

    moving = true;
    $pointer.style.transform = `translateY(${offset}px)`;
    setTimeout(() => {
        moving = false;
    }, TRANSITION_DURATION);

    if(toStopShowing) $techListShowing.removeAttribute('showing');
    if(toShow) {
        const id = $li.getAttribute('for');
        for(let $techList of $techLists) {
            if($techList.id === id) {
                $techList.setAttribute('showing', '');
                break;
            }
        }
    }
}

const $catList = document.querySelector('.about-skills__cat');
const $ul = $catList.querySelector('ul');
const $catsSpan = $ul.querySelectorAll('span');
const $pointer = $catList.querySelector('#cat-pointer');
const $techLists = document.querySelectorAll('.about-skills__tech__list');

const TRANSITION_DURATION = 300;
let moving = false;
