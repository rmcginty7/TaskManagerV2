export class Task {
  // Instance variables
  name: string;
  dateAdded: string;
  dueDate: string;
  isCompleted: boolean;

  constructor(
    name: string,
    dateAdded: string,
    dueDate: string,
    isCompleted: boolean,
  ) {
    this.name = name;
    this.dateAdded = dateAdded;
    this.dueDate = dueDate;
    this.isCompleted = isCompleted;
  }
}
