'use strict';

import { generateID, findNotebook, findNotebookIndex } from "./utils.js";

let notekeeperDB = {};

const initDB = function () {
    const /**{JSON | undefined} */ db = localStorage.getItem('notekeeperDB');
    if (db) {
        notekeeperDB = JSON.parse(db);
    } else {
        notekeeperDB.notebooks = [];
        localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
    }
}

initDB();

const readDB = function () {
    const db = localStorage.getItem('notekeeperDB');
    notekeeperDB = JSON.parse(db);
}

const writeDB = function () {
    localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
}



export const db = {
    post: {
        notebook(name) {
            readDB();
            const notebookData = {
                id: generateID(),
                name,
                notes: []
            }
            notekeeperDB.notebooks.push(notebookData);

            writeDB();
            return notebookData;
        },

        note(notebookId){
            readDB();
            const notebook = findNotebook(notekeeperDB, notebookId);
            const noteData = {
                id: generateID(),
                notebookId,
                ...Object,
                postedOn: new Date().getTime()
            }

            console.log(noteData);
            notebook.notes.unshift(noteData);
            writeDB();

            return noteData;
        }
    },

    get: {
        notebook() {
            readDB();
            return notekeeperDB.notebooks;
        }
    },

    update: {
        notebook(notebookId, name) {
            readDB();
            const notebook = findNotebook(notekeeperDB, notebookId);
            notebook.name = name;
            writeDB();
            
            return notebook;
        }
    },

    delete: {
        notebook(notebookId){
            readDB();
            const notebookIndex = findNotebookIndex(notekeeperDB, notebookId);
            notekeeperDB.notebooks.splice(notebookIndex, 1);
            writeDB();
        }
    }

}