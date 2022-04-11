import React, { useState } from "react";
import paper from "../../../images/note-sticky-regular.svg";
import classNames from "classnames/bind";
import classes from "../styles.module.scss";
import { Todo } from "../../../todo.model";

const cx = classNames.bind(classes);
const colorArray = [
  "#0cb1fc",
  "#2f68f4",
  "#a237e9",
  "#fb02ae",
  "#dc1733",
  "#f48022",
  "#febd4c",
  "#fafc3d",
  "#aced0b",
  "#35d86c",
];
type CardProps = {
  title: string;
  data: Todo[];
  completeHandler: (id: string) => void;
  onSwap?: (dragStartNum: number, dragEndNum: number) => void;
};

const TaskCard: React.FC<CardProps> = (props) => {
  const [styleStatus, setStyleStatus] = useState<string>();
  const { onSwap } = props;
  function titleCase(arg: string) {
    return arg[0].toUpperCase() + arg.slice(1).toLowerCase();
  }
  let dragStartNum: number = -1;
  let dragEndNum: number = -1;
  return (
    <div className={cx("task-card")}>
      <div className={cx("tag")}>{titleCase(props.title)}</div>
      <div className={cx("card-body")}>
        {props.data
          .sort((a, b) => (onSwap ? a.order - b.order : 0))
          .map((e) => (
            <div
              className={cx("content", { dragover: styleStatus === e.id })}
              key={e.id}
              draggable={Boolean(onSwap)}
              onDragStart={() => {
                dragStartNum = e.order;
              }}
              onDragOver={(evt) => {
                evt.preventDefault();
                dragEndNum = e.order;
                onSwap && setStyleStatus(e.id);
              }}
              onDragLeave={() => {
                setStyleStatus("0");
              }}
              onDrop={() => {
                setStyleStatus("0");
                onSwap && onSwap(dragStartNum, dragEndNum);
              }}
            >
              <div>
                <img src={paper} alt="todo" />
                <span>{e.text}</span>
                {e.tags === "completed" && (
                  <span style={{ color: colorArray[2] }}>{e.tags}</span>
                )}
              </div>
              <input
                type="checkbox"
                checked={e.completed}
                onClick={() => props.completeHandler(e.id)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskCard;
