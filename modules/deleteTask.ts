import * as fs from "fs/promises";
import { input, confirm } from "@inquirer/prompts";

import { Task } from "../models/Task";
import { viewTasks } from "./viewTasks";
import { getTasks } from "../storage/taskStorage";

const outputFilePath: string = "data/output.json";

export async function handleDeleteTask() {
  console.log(
    "Here is the current task list, which one would you like to delete?",
    viewTasks(),
  );
  const deletedTask = await input({
    message: "Type the task exactly as you see in the list: ",
  });
  const confirmDeletion = await confirm({
    message: `Is this the task you would like to delete? ${deletedTask}`,
  });
  if (confirmDeletion == true) {
    await deleteTask(deletedTask);
    console.log("Task successfully deleted");
  } else {
    handleDeleteTask();
  }
}

async function deleteTask(name: string) {
  const tasks: Task[] = getTasks();

  const index = tasks.findIndex((task) => task.name == name);

  if (index != -1) {
    tasks.splice(index, 1);
  }
  await fs.writeFile(outputFilePath, JSON.stringify(tasks), "utf8");
}
