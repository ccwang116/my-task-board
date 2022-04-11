import React, { useState } from "react";
import paper from "../../images/note-sticky-regular.svg";
import { Todo, Tag, addFormdata } from "../../todo.model";
import classNames from "classnames/bind";
import classes from "./styles.module.scss";
import TaskCard from "./TaskCard";
import Create from "./Create";

const cx = classNames.bind(classes);
const MainBoard: React.FC = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tags, setTags] = useState<Tag[]>([
    { id: "1122", text: "movies" },
    { id: "334", text: "books" },
  ]);
  const todoAddHandler = (data: addFormdata) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Math.random().toString(),
        text: data.taskName,
        tags: data.taskTag,
        time: data.taskTime,
        completed: false,
        order: todos.filter((e) => e.tags === data.taskTag).length + 1,
      },
    ]);
  };
  const tagAddHandler = (text: string) => {
    setTags((prevTodos) => [
      ...prevTodos,
      {
        id: Math.random().toString(),
        text: text,
      },
    ]);
  };

  const todoDeleteHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };
  const completeHandler = (todoId: string) => {
    const target = todos.filter((todo) => todo.id === todoId);
    if (target.length === 0) {
      return;
    }
    const targetItem = target[0];
    targetItem.completed = !targetItem.completed;
    setTodos((prevTodos) => {
      return [...prevTodos.filter((todo) => todo.id !== todoId), targetItem];
    });
  };
  const onSwap = (dragStartNum: number, dragEndNum: number) => {
    const modiSeed = (item: Todo) => {
      switch (item.order) {
        case dragStartNum:
          return { ...item, order: dragEndNum };
        case dragEndNum:
          return { ...item, order: dragStartNum };
        default:
          return item;
      }
    };
    let newtodos: Todo[] = todos.map((item) => modiSeed(item));
    setTodos(newtodos);
  };
  return (
    <div className={cx("box")}>
      <div className={cx("headline")}>My board</div>
      <Create onAddTodo={todoAddHandler} tags={tags} onAddTag={tagAddHandler} />
      <div className={cx("container")}>
        {tags.map((e) => (
          <TaskCard
            key={e.id}
            title={e.text}
            data={todos.filter((todo) => todo.tags === e.text)}
            completeHandler={completeHandler}
            onSwap={onSwap}
          />
        ))}
        <TaskCard
          key={"completed"}
          title={"completed"}
          data={todos.filter((todo) => todo.completed)}
          completeHandler={completeHandler}
        />
        <TaskCard
          key={"uncompleted"}
          title={"uncompleted"}
          data={todos.filter((todo) => !todo.completed)}
          completeHandler={completeHandler}
        />
      </div>
    </div>
  );
};

export default MainBoard;
