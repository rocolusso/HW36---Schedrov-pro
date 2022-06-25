'use strict';
const controller = (view, model, payload) => {
  const { formSelector } = payload;
  const { todosContainerSelector } = payload;

  const form = document.querySelector(formSelector);
  const todosContainer = document.querySelector(todosContainerSelector);

  model.init(formSelector);
  view.init(form, todosContainer);

  const fetchFromData = (inputs) => {
    let data = inputs;
    if (inputs instanceof NodeList) {
      data = Array.from(inputs);
    }

    return data.reduce((acc, item) => {
      acc[item.name] = item.value;
      return acc;
    }, {});
  };
  const submitHandle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const inputs = form.querySelectorAll('input, textarea');

    const data = model.setData(fetchFromData(inputs));

    if (!data.success) throw new Error('Something was wrong while saving data');

    view.renderTodoItem(data.savedData);
    view.clearForm();
  };

  const loadHandle = () => {
    const todoItems = model.getData();
    if (!todoItems) return;
    todoItems.forEach((item) => { view.renderTodoItem(item); });
  };

  const removeTodoHandle = (e) => {
    e.stopPropagation();
    if (!e.target.classList.contains('remove')) return;

    let todoId = e.target.closest('[data-todo-id]').getAttribute('data-todo-id');
    todoId = +todoId;
    model.removeTodoItem(todoId);
    view.removeTodoItem(todoId);
  };

  const changeStatusHandle = (e) => {
    e.stopPropagation();
    if (!e.target.classList.contains('status')) return;

    const changedStatus = e.target.value;
    const todoId = +e.target.closest('[data-todo-id]').getAttribute('data-todo-id');

    model.changeItemStatus(changedStatus, todoId);
  };

  form.addEventListener('submit', submitHandle);
  window.addEventListener('DOMContentLoaded', loadHandle);
  todosContainer.addEventListener('click', removeTodoHandle);
  todosContainer.addEventListener('change', changeStatusHandle);

  return {

  };
};
