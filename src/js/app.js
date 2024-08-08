
'use strict';
import { Tooltip } from "./Tooltip.js";
import { addEventOnElements, getGreeting } from "./utils.js";

//Toggle sidebar for small Displays
const $sidebar = document.querySelector('[data-sidebar]'); // HTML Element
const $sidebarTogglers = document.querySelectorAll('[data-sidebar-toggler]'); // Array<HTMLElement>
const $overlay = document.querySelector('[data-sidebar-overlay]'); // HTML Element

addEventOnElements($sidebarTogglers, 'click', function () {
    $sidebar.classList.toggle('active');
    $overlay.classList.toggle('active');
})


// Greeting message based on the time of the day
const $greetingElement = document.querySelector('[data-greeting]');
const currentHour = new Date().getHours();
$greetingElement.textContent = getGreeting(currentHour);

// Initialize tooltip behaviorfor all DOM elements with the [data-tooltip] attribute
const $tooltipElements = document.querySelectorAll('[data-tooltip]');
$tooltipElements.forEach($elem => Tooltip($elem));