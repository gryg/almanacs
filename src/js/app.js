
'use strict';
import { Tooltip } from "./Tooltip.js";
import { addEventOnElements, getGreeting, activeNotebook, makeElementEditable } from "./utils.js";
import { db } from "./db.js";
import { client } from "./client.js";
import { NoteModal } from "./components/Modal.js";

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

// Initialize tooltip behavior for all DOM elements with the [data-tooltip] attribute
const $tooltipElements = document.querySelectorAll('[data-tooltip]');
$tooltipElements.forEach($elem => Tooltip($elem));


// Notebook: Create field

const $sidebarList = document.querySelector('[data-sidebar-list]');
const $addNotebookButton = document.querySelector('[data-add-notebook]');

// Shows a notebook creation field in the sidebar when the 'Add Notebook' button is clicked
// The function dynamically adds a new notebook field element, makes it editable and listens for the 'Enter' key 
// to create a new notebook


const showNotebooksField = function () {
    const $navItem = document.createElement('div');
    $navItem.classList.add('nav-item');
    $navItem.innerHTML = `
    <span class = "text text-label-large" data-notebook-field></span>

    <div class="state-layer"></div>
    `;
    $sidebarList.appendChild($navItem);

    const $navItemField = $navItem.querySelector('[data-notebook-field]');

    activeNotebook.call($navItem);

    // Make notebook field content editable and focus
    makeElementEditable($navItemField);

    $navItemField.addEventListener('keydown', createNotebook);

}


$addNotebookButton.addEventListener('click', showNotebooksField);

const createNotebook = function (event) {
    if (event.key === 'Enter') {
       const notebookData = db.post.notebook(this.textContent || 'New Notebook');
       this.parentElement.remove();

       // Render navItem
        client.notebook.create(notebookData);
    }
}

const renderExistingNotebook = function () {
    // Load existing notebooks from the database
    const notebookList = db.get.notebook();
    console.log(notebookList)
    client.notebook.read(notebookList);
}
renderExistingNotebook();



/**
 * Create new note: Attaches event listenres to a collection of DOM elems representing "Add Note/Create Note" buttons.
 * When a button is clicked, it opens a modal for creating a new note and handles the submission to the db & client
 */

const $addNoteButtons = document.querySelectorAll('[data-note-create-btn]');
addEventOnElements($addNoteButtons, 'click', function () {
    // Create and open a new note modal
    const modal = NoteModal();
    modal.open();
    modal.onSubmit(noteObj =>{
        const activeNotebookId = document.querySelector('[data-notebook].active').dataset.notebook;

        const noteData = db.post.note(activeNotebookId, noteObj);
        client.note.create(noteData);
        modal.close();
    });

});