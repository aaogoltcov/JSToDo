'use strict';

const taskInput = document.getElementById('task__input');
const taskButton = document.getElementById('tasks__add');
const taskList = document.getElementById('tasks__list');
let taskListArray;
let taskListArrayRemoveButton;
let key;

function loadFromStorage(){
    let storageArray = localStorage;
    if (storageArray.length > 0) {
        for (let key in {...storageArray}) {
            if (storageArray[key]) {
                taskListInsert(key, storageArray[key]);
            };
        };
    };
    getQueries();
};

function taskListInsert(key, inputValue) {
    taskList.insertAdjacentHTML('beforeend',
        `<div class="task">
                 <div class="task__title" id="${key}">${inputValue}</div>
                 <a href="#" class="task__remove">&times;</a>
              </div>`
    );
};

function getQueries() {
    taskListArray = document.querySelectorAll('div.task');
    taskListArrayRemoveButton = Array.from(document.querySelectorAll('a.task__remove'));
};

taskInput.oninput = function () {
    taskButton.onclick = function () {
        if (taskInput.value) {
            key = (new Date).toISOString();
            taskListInsert(key, taskInput.value);
            localStorage.setItem(key, taskInput.value);
            getQueries();
            taskInput.value = '';
        };
        removeFromTaskList()
        return false;
    }
};

function removeFromTaskList() {
    taskListArrayRemoveButton.forEach(function (button, index) {
        button.onclick = function () {
            taskListArray[index].remove();
            localStorage.removeItem(`${taskListArray[index].querySelector('div.task__title').id}`);
            return false;
        };
    });
};

loadFromStorage();

removeFromTaskList();

