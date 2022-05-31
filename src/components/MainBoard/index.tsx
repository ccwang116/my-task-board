import React, { useEffect, useState } from "react";
import { Todo, Tag, addFormdata } from "todo.model";
import classNames from "classnames/bind";
import classes from "./styles.module.scss";
import TaskCard from "./TaskCard";
import Create from "./Create";
import Timelines from "../TimelineCard";

import tutorial1 from "images/tutorial-1.png";
import tutorial2 from "images/tutorial-2.png";
import circleQ from "images/circle-question-regular.svg";

import { defaultTasks, defaultTags } from "data/defaultdata";

const cx = classNames.bind(classes);
const MainBoard: React.FC = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [keyword, setKeyword] = useState<string>("all");
  const [tutorOrder, setTutorOrder] = useState<number>(0);
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
  const onSwap = (dragStartNum: number, dragEndNum: number, label: string) => {
    const noChange = todos.filter((e) => e.tags !== label);
    const target = todos.filter((e) => e.tags === label);
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
    let newtodos: Todo[] = target.map((item) => modiSeed(item));
    setTodos([...newtodos, ...noChange]);
  };
  const tutorHandler = () => {
    if (tutorOrder < 2) {
      setTutorOrder(tutorOrder + 1);
    } else {
      setTutorOrder(0);
    }
  };
  useEffect(() => {
    setTodos(defaultTasks);
    setTags(defaultTags);
  }, []);
  return (
    <div className={cx("box")}>
      <img
        className={cx("tutorial1", { active: tutorOrder === 1 })}
        src={tutorial1}
        alt="tutorial1"
      />
      <img
        className={cx("tutorial2", { active: tutorOrder === 2 })}
        src={tutorial2}
        alt="tutorial2"
      />
      <div
        className={cx("nextStep", { active: tutorOrder !== 0 })}
        onClick={tutorHandler}
      >
        {tutorOrder === 2 ? "OK ! " : "Next"}
      </div>
      <div className={cx("block", { active: tutorOrder !== 0 })} />
      <div className={cx("headline")}>
        My board
        <img
          className={cx("circleQ")}
          src={circleQ}
          onClick={() => setTutorOrder(1)}
          alt="circleQ"
          title="Click to See Tutorial Step"
        />
      </div>
      <Create onAddTodo={todoAddHandler} tags={tags} onAddTag={tagAddHandler} />
      <div className={cx("container")}>
        {tags.map((e) => (
          <TaskCard
            key={e.id}
            title={e.text}
            data={todos.filter((todo) => todo.tags === e.text)}
            completeHandler={completeHandler}
            onDelete={todoDeleteHandler}
            onSwap={onSwap}
          />
        ))}
      </div>
      <div className={cx("hr")}></div>
      <div className={cx("checklist")}>
        <span className={cx("selectLabel")}>All Checklist</span>
        <div>
          <span className={cx("selectLabel")}>Filter by:</span>
          <select
            className={cx("mb-large")}
            onChange={(e) => setKeyword(e.target.value)}
          >
            <option key={"all"} value={"all"}>
              all
            </option>
            {tags.map((e) => (
              <option key={e.id} value={e.text}>
                {e.text}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={cx("container")}>
        <TaskCard
          key={"completed"}
          title={"completed"}
          isShowLabel={true}
          data={todos.filter((todo) =>
            keyword === "all"
              ? todo.completed
              : todo.completed && todo.tags === keyword
          )}
          completeHandler={completeHandler}
          onDelete={todoDeleteHandler}
          tags={tags}
        />
        <TaskCard
          key={"uncompleted"}
          title={"uncompleted"}
          isShowLabel={true}
          data={todos.filter((todo) =>
            keyword === "all"
              ? !todo.completed
              : !todo.completed && todo.tags === keyword
          )}
          completeHandler={completeHandler}
          onDelete={todoDeleteHandler}
          tags={tags}
        />
      </div>
      <Timelines todos={todos} />
    </div>
  );
};

export default MainBoard;
