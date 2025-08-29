export interface ITask {
id: string;
todo: string;
completed: boolean;
userId: number;
}

export interface ITaskResponse {
  todos: ITask[];
  total: number;
  skip: number;
  limit: number;
}