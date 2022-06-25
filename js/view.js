'use strict';
const view = () => {
  const createTodoItem = (data) => {
    const statuses = [
      {
        id: 1,
        value: 'no-status',
        title: 'Без статуса',
      },
      {
        id: 2,
        value: 'pending',
        title: 'В обработке',
      },
      {
        id: 3,
        value: 'completed',
        title: 'Завершен',
      },
    ];

    const currentStatus = statuses.filter((status) => status.value === data.status)[0]; // Current Status obj
    const anotherStatuses = statuses.filter((status) => status.value !== data.status);

    const wrapperElement = document.createElement('div');
    wrapperElement.classList.add('col-4');
    wrapperElement.setAttribute('data-todo-id', data.id);

    const statusWrapper = ` <div class="taskStatus d-flex align-items-center" >
                                    <span>Status:</span>
                                        <select class="form-select status">       
                                            <option 
                                                selected
                                                value="${currentStatus.value}" >
                                                ${currentStatus.title}
                                            </option>
                                            
                                            ${anotherStatuses.map((item) => `<option value="${item.value}">
                                                                ${item.title}
                                                         </option>`)}
                                      
                                        </select>
                                 </div>`;

    wrapperElement.innerHTML = `<div class="taskWrapper">
                <div class="taskHeading">${data.title}</div>
                <div class="taskDescription mb-3">${data.description}</div>
                ${statusWrapper}
                <button class="btn btn-danger remove">Remove</button>
             </div>`;
    return wrapperElement;
  };

  return {

    form: null,
    todoContainer: null,

    renderTodoItem(data) {
      const itemTemplate = createTodoItem(data);
      this.todoContainer.append(itemTemplate);
    },

    removeTodoItem(id) {
      document.querySelector(`[data-todo-id="${id}"]`).remove();
    },

    clearForm() {
      this.form.reset();
    },

    init(formElement, todoContainer) {
      this.form = formElement;
      this.todoContainer = todoContainer;
    },

  };
};
