'use strict';

export default function() {

    $pointer.style.transition = `transform ${TRANSITION_DURATION}ms ease-in-out`;
    for(let $li of $ul.children) {
        $li.lastElementChild.style.transition = `margin-left ${TRANSITION_DURATION}ms ease-in-out`;
    }
    
    $ul.addEventListener('mouseover', e => {
        if(e.target.tagName.toLowerCase() === 'span') {
            selectCat(e.target.parentElement);
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

    setTimeout(() => {
        $li.insertAdjacentElement('afterbegin', $pointer);
    }, TRANSITION_DURATION / 2);

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
