'use strict';
import { NavItem } from "./components/NavItem.js";
import { activeNotebook } from "./utils.js";
/**
 * The client object manages the interaction between the UI and the database.
 * Provides functions for performing the operations and updating the UI.
 */
const $sidebarList = document.querySelector('[data-sidebar-list]');
const $notePanelTitle = document.querySelector('[data-note-panel-title]');

export const client = {
    notebook: {
        create(notebookData) {
            const $navItem = NavItem(notebookData.id, notebookData.name);
            $sidebarList.appendChild($navItem);
            activeNotebook.call($navItem);
            $notePanelTitle.textContent = notebookData.name;
        },
        read(notebookList) {
            notebookList.forEach((notebookData, index) => {
                const $navItem = NavItem(notebookData.id, notebookData.name);

                if (index === 0) {
                    activeNotebook.call($navItem);
                    $notePanelTitle.textContent = notebookData.name
                }

                $sidebarList.appendChild($navItem);
            });
        }
    }

}