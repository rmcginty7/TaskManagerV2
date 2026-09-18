import { select } from "@inquirer/prompts";

import { handleAddTask } from "./modules/addTask";
import { handleCompleteTask } from "./modules/completeTask";
import { handleDeleteTask } from "./modules/deleteTask";
import { handleEditTask } from "./modules/editTask";
import { handleFilterTask } from "./modules/filterTask";
import { viewTasks } from "./modules/viewTasks";

async function getChoice() {
  try {
    var choice = await select({
      message: "What operation would you like to do today?",
      choices: [
        {
          name: "Add a task",
          value: "add",
        },
        {
          name: "Complete a task",
          value: "complete",
        },
        {
          name: "View all current tasks",
          value: "view",
        },
        {
          name: "Delete a task",
          value: "delete",
        },
        {
          name: "Filter tasks",
          value: "filter",
        },
        {
          name: "Edit an existing task",
          value: "edit",
        },
      ],
    });

    switch (choice) {
      case "add":
        await handleAddTask();
        break;
      case "complete":
        await handleCompleteTask();
        break;
      case "view":
        console.log(viewTasks());
        break;
      case "delete":
        await handleDeleteTask();
        break;
      case "filter":
        await handleFilterTask();
        break;
      case "edit":
        await handleEditTask();
        break;
    }
  } finally {
  }
}

getChoice();
