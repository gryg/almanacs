'use strict';

import { generateID } from "./utils.js";

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
        }
    },

    get: {
        notebook() {
            readDB();
            return notekeeperDB.notebooks;
        }
    }

}