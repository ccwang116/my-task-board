export interface Todo {
  id: string;
  text: string;
  tags: string;
  time: string;
  completed: boolean;
  order: number;
}
export interface Tag {
  id: string;
  text: string;
}
export type addFormdata = {
  taskName: string;
  taskTag: string;
  taskTime: string;
};
