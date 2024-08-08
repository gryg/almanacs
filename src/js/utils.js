
'use strict';

/**
 * 
 * @param {Array<HTMLElement>} $elements - array of DOM elements to attach the event listener to 
 * @param {String} eventType - type of event to listen for (e.g.: 'mouseover', 'click' etc.)
 * @param {Function} callback - function to be executed when the said event occurs
 */

const addEventOnElements = function ($elements, eventType, callback) {
    // console.log($elements);
    $elements.forEach($element => $element.addEventListener(eventType, callback));
}

/**
 * 
 * @param {*} currentHour 
 */
const getGreeting = function (currentHour) {
    const greeting =
        currentHour >= 4 && currentHour < 7 ? 'Good Morning, early bird!' :
            currentHour >= 7 && currentHour < 12 ? 'Good Morning' :
                currentHour >= 12 && currentHour < 17 ? 'Good Afternoon' :
                    currentHour >= 17 && currentHour < 22 ? 'Good Evening' :
                        'Good Night, wonderer';
    return greeting + '!';
}

let /**{HTMLElement | undefined} */ $lastActiveItem;

/**
 * Activates a navigation item by adding the 'active' class to it 
 * and deactivates the previously active item.
 */

const activeNotebook = function () {
    $lastActiveItem?.classList.remove('active');
    this.classList.add('active'); //this: $navItem
    $lastActiveItem = this;
}

/**
 * Makes an element editable by setting the 'conteneditable' attribute to true and focuses on it
 * @param {HTMLElement} $element - element to be made editable
 */

const makeElementEditable = function ($element) {
    $element.setAttribute('contenteditable', true);
    $element.focus();
}

const generateID = function () {
    return new Date().getTime().toString();
}

export {
    addEventOnElements,
    getGreeting,
    activeNotebook,
    makeElementEditable,
    generateID
}
