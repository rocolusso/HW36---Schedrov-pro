'use strict';
const model = () => ({

  dbName: null,
  currentId: null,
  initStatus: 'no-status',
  currentStatus: null,

  setDBName(key) {
    if (!key.trim()) throw new Error(' It`s not possible, db key required ');
    this.dbName = key;
  },

  getData() {
    return JSON.parse(localStorage.getItem(this.dbName));
  },

  setData(data) {
    let response = null;
    const todoItemData = structuredClone(data);
    const savedData = this.getData();
    const dataToSave = savedData || [];

    todoItemData.id = this.currentId;
    todoItemData.status = this.initStatus;
    dataToSave.push(todoItemData);
    console.log(dataToSave);

    try {
      localStorage.setItem(this.dbName, JSON.stringify(dataToSave));
      response = { success: true, savedData: todoItemData };
      this.currentId += 1;
    } catch (error) {
      response = { success: false, errors: error };
    }

    return response;
  },

  changeItemStatus(statusToChange, itemId) {
    const data = this.getData();
    const itemToUpdate = data.filter((todoItem) => todoItem.id === itemId)[0]; // obj

    itemToUpdate.status = statusToChange;
    const updatedItem = itemToUpdate;

    const dataWithoutChangebleItem = data.filter((todoItem) => todoItem.id !== itemId);
    dataWithoutChangebleItem.push(updatedItem);

    localStorage.setItem(this.dbName, JSON.stringify(dataWithoutChangebleItem));
  },

  removeTodoItem(id) {
    const data = this.getData();
    const updatedData = data.filter((todoItem) => todoItem.id !== id);

    if (updatedData.length) {
      localStorage.setItem(this.dbName, JSON.stringify(updatedData));
    } else {
      localStorage.removeItem(this.dbName);
    }
  },

  init(dbKey) {
    this.setDBName(dbKey);
    const savedData = this.getData();
    this.currentId = savedData ? savedData[savedData.length - 1].id + 1 : 1;
  },

});
