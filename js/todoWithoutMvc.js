'use strict';
void (function () {
  const createDivItem = (obj, selector) => {
    const divCol = document.createElement('div');
    divCol.classList = 'col-4';
    divCol.innerHTML = `<div class="taskWrapper">
                            <div class="taskHeading">${obj.title}</div>
                            <div class="taskDescription">${obj.description}</div>
                        </div>`;

    document.querySelector(selector).append(divCol);
  };

  const loadContent = () => {
    const getTodoList = JSON.parse(localStorage.getItem('todoList'));
    getTodoList.map((item) => {
      createDivItem(item, '#todoItems');
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!localStorage.getItem('todoList')) {
      const getInputs = e.target.querySelectorAll('input,textarea');
      const todoItem = {};
      const todoAllItems = [];

      getInputs.forEach((item) => {
        todoItem[item.name] = item.value;
      });

      todoAllItems.push(todoItem);

      localStorage
        .setItem('todoList', JSON.stringify(todoAllItems));

      loadContent();
    } else {
      const getInputs = e.target.querySelectorAll('input,textarea');
      const todoItem = {};
      const getTodoList = JSON.parse(localStorage.getItem('todoList'));

      getInputs.forEach((item) => {
        todoItem[item.name] = item.value;
      });

      getTodoList.push(todoItem);

      createDivItem(todoItem, '#todoItems');

      localStorage
        .setItem('todoList', JSON.stringify(getTodoList));
    }
  };

  document
    .querySelector('#todoForm')
    .addEventListener('submit', handleSubmit);

  window.addEventListener('DOMContentLoaded', loadContent);
}());
