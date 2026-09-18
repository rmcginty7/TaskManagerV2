import { select, input, confirm } from "@inquirer/prompts";

import { Task } from "../models/Task";
import { viewTasks } from "./viewTasks";
import { getTasks, saveTasks } from "../storage/taskStorage";

export async function handleEditTask() {
  console.log(
    "Here is the current task list, which one would you like to edit?",
    viewTasks(),
  );
  const editedTask = await input({
    message: "What task would you like to edit? ",
    validate: async (editedTask: string): Promise<boolean | string> => {
      const tasks = getTasks();
      const inTasks: boolean = tasks.some((task) => task.name === editedTask);
      if (!inTasks) {
        return "Please enter a valid task";
      }
      return true;
    },
  });
  const confirmChoice = await confirm({
    message: `Is this the task that you wish to edit? ${editedTask}`,
  });
  if (confirmChoice == true) {
    const editChoice = await select({
      message: "Which section would you like to edit? ",
      choices: [
        {
          name: "Name of task",
          value: "name",
        },
        {
          name: "Due date",
          value: "dueDate",
        },
        {
          name: "Completion status",
          value: "completionStatus",
        },
      ],
    });
    await editTask(editedTask, editChoice);
    console.log("Task successfully edited");
  } else {
    handleEditTask();
  }
}

async function editTask(name: string, editChoice: string) {
  const tasks: Task[] = getTasks();

  const taskToEdit: Task | undefined = tasks.find((task) => task.name == name);

  if (!taskToEdit) {
    throw new Error(`Task "${name} was not found`);
  }

  if (editChoice == "name") {
    const newName: string = await input({
      message: "What is the new name of your task? ",
    });
    const confirmCompletion: boolean = await confirm({
      message: `Is this the correct name ${newName}? `,
    });

    if (confirmCompletion) {
      taskToEdit.name = newName;
    } else {
      await editTask(name, editChoice);
    }
  } else if (editChoice == "dueDate") {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    const newDueDate: string = await input({
      message: "What is your new due date? (MM/DD/YYYY)",
      validate: async (newDueDate: string): Promise<boolean | string> => {
        if (!regex.test(newDueDate)) {
          return "Please enter a date in the valid format";
        }
        return true;
      },
    });
    taskToEdit.dueDate = newDueDate;
  } else if (editChoice == "completionStatus") {
    taskToEdit.isCompleted = !taskToEdit.isCompleted;
  }
  await saveTasks(tasks);
}
