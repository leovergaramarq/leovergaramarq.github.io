export function hasAncestor(element, ancestor) {
    while ((element = element.parentElement) !== null) {
        if (element === ancestor) return true;
    }
    return false;
}
