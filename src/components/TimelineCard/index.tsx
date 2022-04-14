import React, { useState } from "react";
import paper from "../../images/note-sticky-regular.svg";
import { Todo } from "../../todo.model";
import moment from "moment";

import classNames from "classnames/bind";
import classes from "./styles.module.scss";
const cx = classNames.bind(classes);
type TimelinesProps = {
  todos: Todo[];
};
const Timelines: React.FC<TimelinesProps> = (props) => {
  return (
    <div className={cx("box")}>
      <div className={cx("task-card")}>
        <div className={cx("tag")}>Timelines</div>
        <div className={cx("arrow")}>▶</div>
        <div className={cx("card-body")}>
          {props.todos
            .sort(
              (a, b) =>
                +moment(b.time).format("x") - +moment(a.time).format("x")
            )
            .map((e) => (
              <div className={cx("content")} key={e.id}>
                <div>
                  <img src={paper} alt="todo" />
                  <span>{e.text}</span>
                </div>
                <span className={cx("time")}>{e.time}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Timelines;
