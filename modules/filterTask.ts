import { select } from "@inquirer/prompts";

import { Task } from "../models/Task";
import { getTasks } from "../storage/taskStorage";

export async function handleFilterTask() {
  console.log("What would you like to filter the tasks by?");

  var filteredChoice = await select({
    message: "What would you like to filter the tasks by?",
    choices: [
      {
        name: "Is completed",
        value: "isCompleted",
      },
      {
        name: "Isn't completed",
        value: "isntCompleted",
      },
    ],
  });
  filterTask(filteredChoice);
}

async function filterTask(filteredChoice: string) {
  const tasks: Task[] = getTasks();

  if (filteredChoice === "isCompleted") {
    console.log(tasks.filter((task) => task.isCompleted == true));
  } else if (filteredChoice === "isntCompleted") {
    console.log(tasks.filter((task) => task.isCompleted == false));
  }
  return;
}
