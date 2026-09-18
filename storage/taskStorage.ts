import * as fs from "fs/promises";
import { readFileSync } from "node:fs";
import { Task } from "../models/Task";

const outputFilePath: string = "data/output.json";

export function getTasks() {
  try {
    const rawData = readFileSync("data/output.json", "utf8");
    if (!rawData.trim()) return [];
    const tasks: Task[] = JSON.parse(rawData);
    return tasks;
  } catch (error: any) {
    console.log("Error loading json", error.message);
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await fs.writeFile(outputFilePath, JSON.stringify(tasks), "utf8");
}
