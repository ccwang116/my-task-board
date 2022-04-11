import React, { useState } from "react";

import { Todo } from "../../todo.model";
import clipboard from "../../images/clipboard-regular.svg";
import classNames from "classnames/bind";
import classes from "./styles.module.scss";
const cx = classNames.bind(classes);

const Banner: React.FC = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div>
      <img
        className={cx("banner")}
        src="https://cdn.pixabay.com/photo/2018/10/09/10/01/architecture-3734552_960_720.jpg"
        alt="banner"
      />
      <img src={clipboard} alt="icon" className={cx("icon")} />
    </div>
  );
};

export default Banner;
