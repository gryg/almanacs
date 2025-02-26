'use strict';


const $overlay = document.createElement('div');
$overlay.classList.add('overlay','modal-overlay');

const NoteModal = function (title = 'Untitled', text='Create your note here...', time = '') {
    const $modal = document.createElement('div');
    $modal.classList.add('modal');
    $modal.innerHTML = `
        <button class="icon-btn large" aria-label="Close modal" data-close-btn>
            <span class="material-symbols-rounded" aria-hidden="true">close</span>
            <div class="state-layer"></div>
        </button>

        <input type="text" placeholder="Untitled" value="${title}" class="modal-title text-title-medium" data-note-field>
        <textarea placeholder="Create a note.."
            class="modal-text text-body-large custom-scrollbar" data-note-field>${text}</textarea>
        <div class="modal-footer">
            <span class="time text-label-large">${time}</span>
            <button class="btn text" data-submit-btn>
                <span class="text-label-large">Save</span>
                <div class="state-layer"></div>
            </button>
        </div>
    `;
    const $submitBtn = $modal.querySelector('[data-submit-btn]');

    const [$titleField, $textField] = $modal.querySelectorAll('[data-note-field]');
    $submitBtn.disabled = true;

    const enableSubmitBtn = function () {
        $submitBtn.disabled = !$titleField.value && !$textField.value;
    }

    $textField.addEventListener('keyup', enableSubmitBtn);
    $titleField.addEventListener('keyup', enableSubmitBtn);

    const open = function () {
        document.body.appendChild($modal);
        document.body.appendChild($overlay);
        $titleField.focus();
    }

    const close = function () {
        document.body.removeChild($modal);
        document.body.removeChild($overlay);
    }

    const $closeBtn = $modal.querySelector('[data-close-btn]');
    $closeBtn.addEventListener('click', close);

    const onSubmit = function (callback) {
        $submitBtn.addEventListener('click', function () {
            const noteData = {
            title : $titleField.value,
            text : $textField.value
            }
            callback(noteData);
        });
    }

    return {open, close, onSubmit}
}


const DeleteConfirmModal = function (title) {
    const $modal = document.createElement('div');
    $modal.classList.add('modal');
    $modal.innerHTML = `
    <h3 class="modal-title text-title-medium">
        <strong><span style="font-style: italic;">Deleting is irreversible!</span></strong>
    Are you sure you want to delete <strong>"${title}"</strong> ?</h3>

    <div class="modal-footer">
            <button class="btn text" data-action-btn="false">
                <span class="text-label-large">Cancel</span>
                <div class="state-layer"></div>
            </button>
            <button class="btn fill" data-action-btn="true">
                <span class="text-label-large">Delete</span>
                <div class="state-layer"></div>
            </button>
        </div>
    `;

    /**
     * Opens delete confirm modal by appending it to the document body
    */
    const open = function () {
        document.body.appendChild($modal);
        document.body.appendChild($overlay);
    }

    /**
     * Closes delete confirm modal by removing it from the document body
     */
    const close = function () {
        document.body.removeChild($modal);
        document.body.removeChild($overlay);
    }

    const $actionBtns = $modal.querySelectorAll('[data-action-btn]');

    /**
     * Handles the submission of the delete confirm modal
     * 
     * @param {Function} callback - callback function to be executed with the confirmation result (true for confirmation, false for cancellation)
     * 
     */
    const onSubmit = function (callback) {
        $actionBtns.forEach($btn => $btn.addEventListener('click', function () {
            const isConfirmed = this.getAttribute('data-action-btn') === 'true' ? true : false;
            callback(isConfirmed);
            // close();
        }));
    }


    return {open, close, onSubmit}
}

export { DeleteConfirmModal, NoteModal }