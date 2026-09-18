import { Task } from "../models/Task";
import { getTasks } from "../storage/taskStorage";

export function viewTasks() {
  const tasks: Task[] = getTasks();

  return tasks.map(
    (task: any) =>
      new Task(task.name, task.dateAdded, task.dueDate, task.isCompleted),
  );
}
