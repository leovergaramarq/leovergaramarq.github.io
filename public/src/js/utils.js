'use strict';

export function hasAncestor(element, ancestor) {
    while ((element = element.parentElement) !== null) {
        if (element === ancestor) return true;
    }
    return false;
}

export function getHash() {
    const hash = window.location.hash;
    if(!hash) return 'home';
    return hash.substring(1);
}
