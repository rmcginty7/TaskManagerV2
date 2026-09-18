"use strict";
class Task {
  name;
  dateAdded;
  dueDate;
  constructor(name, dateAdded, dueDate) {
    this.name = name;
    this.dateAdded = dateAdded;
    this.dueDate = dueDate;
  }
}
let tasks = [];
function addTask(taskList, name) {
  console.log("Would you like to add a new task? ");
  return taskList.push(new Task(name, "Today", "Tomorrow"));
}
function completeTask(name) {}
function deleteTask(name) {}
addTask(tasks, "Do the dishes");
console.log(tasks);
