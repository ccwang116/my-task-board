import React, { useState } from "react";

import TodoList from "../TodoList";
import NewTodo from "../NewTodo";
import { Todo } from "../../todo.model";

const TodoSample: React.FC = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (
    text: string,
    tags: string,
    time: string,
    completed: boolean,
    order: number
  ) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Math.random().toString(),
        text: text,
        tags: "movie",
        time: "2020/04/13",
        completed: true,
        order: 1,
      },
    ]);
  };

  const todoDeleteHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };
  return (
    <>
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </>
  );
};

export default TodoSample;
