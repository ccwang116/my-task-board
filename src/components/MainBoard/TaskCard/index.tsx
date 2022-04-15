import React, { useState } from "react";
import paper from "../../../images/note-sticky-regular.svg";
import Trash from "../../../images/trash-can-regular.svg";

import moment from "moment";
import classNames from "classnames/bind";
import classes from "../styles.module.scss";
import { Todo, Tag } from "../../../todo.model";
import { colorArray } from "../../../data/tagColorList";

const cx = classNames.bind(classes);

type CardProps = {
  title: string;
  data: Todo[];
  isShowLabel?: boolean;
  completeHandler: (id: string) => void;
  onDelete?: (id: string) => void;
  onSwap?: (dragStartNum: number, dragEndNum: number, label: string) => void;
  tags?: Tag[];
};

const TaskCard: React.FC<CardProps> = (props) => {
  const [styleStatus, setStyleStatus] = useState<string>();
  const [dragStartNum, setDragStartNum] = useState<number>(-1);
  const [dragEndNum, setDragEndNum] = useState<number>(-1);
  const { onSwap } = props;
  function titleCase(arg: string) {
    return arg[0].toUpperCase() + arg.slice(1).toLowerCase();
  }

  return (
    <div className={cx("task-card", { "task-card-half": props.isShowLabel })}>
      <div className={cx("tag")}>{titleCase(props.title)}</div>
      <div className={cx("card-body")}>
        {props.data
          .sort((a, b) =>
            onSwap
              ? a.order - b.order
              : +moment(a.time).format("x") - +moment(b.time).format("x")
          )
          .map((e) => (
            <div
              className={cx("content", { dragover: styleStatus === e.id })}
              key={e.id}
              draggable={Boolean(onSwap)}
              onDragStart={() => {
                setDragStartNum(e.order);
              }}
              onDragOver={(evt) => {
                evt.preventDefault();
                setDragEndNum(e.order);
                onSwap && setStyleStatus(e.id);
              }}
              onDragLeave={() => {
                setStyleStatus("0");
              }}
              onDrop={() => {
                setStyleStatus("0");
                onSwap && onSwap(dragStartNum, dragEndNum, e.tags);
              }}
            >
              <div>
                <img src={paper} alt="todo" />
                <span>{e.text}</span>
                {props.isShowLabel && (
                  <span
                    style={{
                      color:
                        colorArray[
                          props.tags
                            ? props.tags.map((e) => e.text).indexOf(e.tags) % 9
                            : 0
                        ],
                    }}
                  >
                    {e.tags}
                  </span>
                )}
              </div>
              <div className={cx("action")}>
                <input
                  type="checkbox"
                  checked={e.completed}
                  onClick={() => props.completeHandler(e.id)}
                />
                <img
                  src={Trash}
                  alt="trash"
                  onClick={() => props.onDelete && props.onDelete(e.id)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskCard;
