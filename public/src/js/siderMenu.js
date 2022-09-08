import { hasAncestor } from "./utils.js";

const $menuSider = document.querySelector('.nav-menu ul');
const $menuSiderItems = $menuSider.querySelectorAll('li');
const $firstSection = document.querySelector('section');

const TRANSITION_DURATION = 500;

export default function() {
    $firstSection.style.transition = `margin-left ${TRANSITION_DURATION}ms`;
    
    document.addEventListener('click', e => {
        let $target = e.target;
        if(hasAncestor($target, $menuSider)) {
            if($target.tagName.toLowerCase() === 'i') $target = $target.parentElement;
            e.preventDefault();
            selectSection($target.href.split('#')[1]);
        }
    });

    selectSection(getHash());
}

function getHash() {
    const hash = window.location.hash;
    if(!hash) return 'home';
    return hash.substring(1);
}

function selectSection(section) {
    const $selectedItem = $menuSider.querySelector('li[selected]');
    const $toSelect = $menuSider.querySelector(`a[href="#${section}"]`).parentElement;

    if($selectedItem) {
        if($selectedItem === $toSelect) return;
        $selectedItem.removeAttribute('selected');
    }
    $toSelect.setAttribute('selected', '');
    slideToSection($toSelect);

    setTimeout(() => {
        window.location.hash = section;
    }, TRANSITION_DURATION);
}

function slideToSection($li) {
    for(let i = 0; i < $menuSiderItems.length; i++) {
        if($menuSiderItems[i] === $li) {
            $firstSection.style.marginLeft = `-${i * 100}%`;
            break;
        }
    }
}
