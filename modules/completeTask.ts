import { input, confirm } from "@inquirer/prompts";

import { Task } from "../models/Task";
import { viewTasks } from "./viewTasks";
import { getTasks, saveTasks } from "../storage/taskStorage";

export async function handleCompleteTask() {
  console.log(
    "Here is the current task list, which one has been completed?",
    viewTasks(),
  );

  const completedTask = await input({
    message: "Type the task exactly as you see in the list: ",
    validate: async (completedTask: string): Promise<boolean | string> => {
      const tasks = getTasks();
      const inTasks: boolean = tasks.some(
        (task) => task.name === completedTask,
      );
      if (inTasks == false) {
        return "Please enter a valid task";
      }
      return true;
    },
  });
  const confirmCompletion = await confirm({
    message: `Is this the task that you completed? ${completedTask}`,
  });
  if (confirmCompletion == true) {
    await completeTask(completedTask);
    console.log("Task successfully completed");
  } else {
    handleCompleteTask();
  }
}

async function completeTask(name: string) {
  const tasks: Task[] = getTasks();
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].name == name) {
      tasks[i].isCompleted = true;
    } else {
      continue;
    }
  }
  await saveTasks(tasks);
}
