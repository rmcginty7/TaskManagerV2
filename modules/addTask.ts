import { input } from "@inquirer/prompts";

import { Task } from "../models/Task";
import { viewTasks } from "./viewTasks";
import { getTasks, saveTasks } from "../storage/taskStorage";

export async function handleAddTask() {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
  const newTask = await input({ message: "What is the name of your task: " });
  const dueDate = await input({
    message: "When is your task due? (MM/DD/YYYY format) ",
    validate: async (dueDate: string): Promise<boolean | string> => {
      if (!regex.test(dueDate)) {
        return "Please enter a date in the valid format";
      }
      return true;
    },
  });
  await addTask(newTask, dueDate);
  console.log("Task successfully added");
  console.log("Updated task list is: ");
  console.log(viewTasks());
}

async function addTask(name: string, dueDate: string) {
  const tasks: Task[] = getTasks();
  const now = new Date();
  var currentTime: string = now.toLocaleDateString();
  tasks.push(new Task(name, currentTime, dueDate, false));
  await saveTasks(tasks);
}
