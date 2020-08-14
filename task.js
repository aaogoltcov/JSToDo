'use strict';

const taskInput = document.getElementById('task__input');
let taskListArray;
let taskListArrayRemoveButton;


function updateLocalstorage() {
    let storageArray = []
    getQueries();
    for (let item in taskListArray) {
        storageArray.push(taskListArray[item].querySelector('div.task__title').textContent);
    };
    localStorage.clear();
    localStorage.setItem('taskList', JSON.stringify(storageArray));
    removeFromTaskList();
};

function loadFromStorage(){
    if (localStorage['taskList']) {
        let storageArray = JSON.parse(localStorage['taskList']);
        if (localStorage.length > 0) {
            for (let key in storageArray) {
                if (storageArray[key]) {
                    taskListInsert(storageArray[key]);
                };
            };
        };
    };
    getQueries();
};

function taskListInsert(inputValue) {
    document.getElementById('tasks__list').insertAdjacentHTML('beforeend',
        `<div class="task">
                 <div class="task__title">${inputValue}</div>
                 <a href="#" class="task__remove">&times;</a>
              </div>`
    );
};

function getQueries() {
    taskListArray = Array.from(document.querySelectorAll('div.task'));
    taskListArrayRemoveButton = Array.from(document.querySelectorAll('a.task__remove'));
};

function removeFromTaskList() {
    if (taskListArrayRemoveButton) {
        taskListArrayRemoveButton.forEach(function (button, index) {
            button.onclick = function () {
                taskListArray[index].remove();
                updateLocalstorage();
                return false;
            };
        });
    };
};

loadFromStorage();

taskInput.oninput = function () {
    document.getElementById('tasks__add').onclick = function () {
        if (taskInput.value) {
            taskListInsert(taskInput.value);
            updateLocalstorage();
            taskInput.value = '';
        };
        removeFromTaskList();
        return false;
    };
};

removeFromTaskList();

