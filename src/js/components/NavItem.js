'use strict';
import { activeNotebook } from "../utils.js";
import { Tooltip } from "../Tooltip.js";

const $notePanelTitle = document.querySelector('[data-note-panel-title]');


export const NavItem = function (id, name) {
    const $navItem = document.createElement('div');
    $navItem.classList.add('nav-item');
    $navItem.setAttribute('data-notebook', id);
    $navItem.innerHTML = `
 <span class="text text-label-large" data-note-create-btn>${name}</span>
                <button class="icon-btn small" aria-label="Edit notebook" data-tooltip="Edit Notebook" data-edit-btn>
                    <span class="material-symbols-rounded" aria-hidden="true">Edit</span>
                    <div class="state-layer"></div>
                </button>
                <button class="icon-btn small" aria-label="Delete notebook" data-tooltip="Delete Notebook"
                    data-edit-btn>
                    <span class="material-symbols-rounded" aria-hidden="true">Delete</span>
                    <div class="state-layer"></div>
                </button>
                <div class="state-layer"></div>
    `;

    //Show tooltip on edit and delete button
    const $toolTipElements = $navItem.querySelectorAll('[data-tooltip]');
    $toolTipElements.forEach($elem => Tooltip($elem));
    $navItem.addEventListener('click', function () {
        $notePanelTitle.textContent = name;
        activeNotebook.call(this);
    });

    return $navItem;
}