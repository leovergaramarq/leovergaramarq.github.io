'use strict';

import { hasAncestor, getHash } from "./utils.js";

export default function mediaQueries() {
    const largeMQ = window.matchMedia('(min-width: 901px)')
    largeMQ.addEventListener('change', handleLargeMQ);
    handleLargeMQ(largeMQ);
    
    // const mediumMQ = window.matchMedia('(min-width: 451px) and (max-width: 900px)')
    const mediumMQ = window.matchMedia('(max-width: 900px)')
    mediumMQ.addEventListener('change', handleMediumMQ);
    handleMediumMQ(mediumMQ);
    
    const smallMQ = window.matchMedia('(max-width: 450px)')
    smallMQ.addEventListener('change', handleSmallMQ);
    handleSmallMQ(smallMQ);
    
    document.body.addEventListener('touchstart', e => {
        // console.log(e.touches[0].clientX, e.touches[0].clientY);
        swipeStartX = e.touches[0].clientX;
        swipeStartY = e.touches[0].clientY;
    });
    
    document.body.addEventListener('touchmove', e => {
        // console.log(e.touches[0].clientX, e.touches[0].clientY);
        swipeEndX = e.touches[0].clientX;
        swipeEndY = e.touches[0].clientY;
    });
    
    document.body.addEventListener('touchend', e => {
        if(mediumMQ.matches && Math.abs(swipeStartY - swipeEndY) < 20) {
            const hash = getHash();

            if(swipeStartX - swipeEndX > 50) {
                console.log('swipe left');
                if(!$aside.hasAttribute('hidden-left')) $aside.setAttribute('hidden-left', '');
                else {
                    switch(hash) {
                        case 'home':
                            $navMenuOptions.about.click();
                            break;
                        case 'about':
                            $navMenuOptions.portfolio.click();
                            break;
                        case 'portfolio':
                            $navMenuOptions.contact.click();
                    }
                }
            } else if(swipeStartX - swipeEndX < -50 && e.target !== $aside && !hasAncestor(e.target, $aside)) {
                console.log('swipe right (not on aside)');
                if(swipeStartX < 50) {
                    console.log('from left edge');
                    if($aside.hasAttribute('hidden-left')) $aside.removeAttribute('hidden-left');
                } else {
                    switch(hash) {
                        case 'about':
                            $navMenuOptions.home.click();
                            break;
                        case 'portfolio':
                            $navMenuOptions.about.click();
                            break;
                        case 'contact':
                            $navMenuOptions.portfolio.click();
                    }
                }
            }
        }
    });

    document.addEventListener('click', e => {
        if(mediumMQ.matches && !$aside.hasAttribute('hidden-left') && e.target !== $aside && !hasAncestor(e.target, $aside)) {
            $aside.setAttribute('hidden-left', '');
        }
    });

}

function handleSmallMQ(e) {
    if (e.matches) {
        console.log('small media query matches');
    } else {
        console.log('small media query does not match');
    }
}

function handleMediumMQ(e) {
    if (e.matches) {
        console.log('medium media query matches');
        if(picIsLast()) $homeHi.insertAdjacentElement('afterend', $homePic);
    } else {
        console.log('medium media query does not match');
    }
}

function handleLargeMQ(e) {
    if (e.matches) {
        console.log('large media query matches');
        if($homeHi.classList.contains('hr-left'))
            $homeHi.classList.remove('hr-left');
        // 
        if(!picIsLast()) $homeContent.insertAdjacentElement('beforeend', $homePic);
    } else {
        console.log('large media query does not match');
        if(!$homeHi.classList.contains('hr-left'))
            $homeHi.classList.add('hr-left');
        // 
        // if(picIsLast()) $homeHi.insertAdjacentElement('afterend', $homePic);
    }
}

function picIsLast() {
    return $homePic.nextElementSibling === null;
}

const $aside = document.querySelector('aside');
const $homeHi = document.querySelector('.home__greet');
const $homePic = document.querySelector('.home__pic');
const $homeContent = document.querySelector('.home__content');
const $navMenuOptions = {
    'home': $aside.querySelector('ul li a[href="#home"]'),
    'about': $aside.querySelector('ul li a[href="#about"]'),
    'portfolio': $aside.querySelector('ul li a[href="#portfolio"]'),
    'contact': $aside.querySelector('ul li a[href="#contact"]')
}

let swipeStartX, swipeStartY;
let swipeEndX, swipeEndY;
