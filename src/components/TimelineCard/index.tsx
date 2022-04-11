import React, { useState } from "react";
import paper from "../../images/note-sticky-regular.svg";
import { Todo } from "../../todo.model";
import classNames from "classnames/bind";
import classes from "./styles.module.scss";
const cx = classNames.bind(classes);
const Timelines: React.FC = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div className={cx("box")}>
      <div className={cx("task-card")}>
        <div className={cx("tag")}>Timelines</div>
        <div className={cx("card-body")}>
          <div className={cx("content")}>
            <div>
              <img src={paper} alt="todo" />
              <span>todo111</span>
            </div>
            2020/5/17 19:00:00
          </div>
          <div className={cx("content")}>
            <div>
              <img src={paper} alt="todo" />
              <span>todo111</span>
            </div>
            2020/5/17 19:00:00
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timelines;
