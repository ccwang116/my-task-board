import React, { useContext } from "react";
import { ReactComponent as Paper } from "../../images/note-sticky-regular.svg";
import { ColorThemeStorage } from "../../contexts/ColorTheme";

import { Todo } from "../../todo.model";
import moment from "moment";

import classNames from "classnames/bind";
import classes from "./styles.module.scss";
import CardHead from "../DesignSystem/CardHead";
const cx = classNames.bind(classes);
type TimelinesProps = {
  todos: Todo[];
};
const Timelines: React.FC<TimelinesProps> = (props) => {
  const themeData = useContext(ColorThemeStorage);
  const iconTheme: { [key: string]: string } = {
    dark: "#fff",
    light: "#4a4d4e",
  };
  const scrollTheme: { [key: string]: string } = {
    dark: "scroll-dark",
    light: "scroll-light",
  };
  return (
    <div className={cx("box")}>
      <div className={cx("task-card")}>
        <CardHead title="Timelines" />
        <div className={cx("arrow")}>▶</div>
        <div className={cx("card-body", scrollTheme[themeData?.themeName!])}>
          {props.todos
            .sort(
              (a, b) =>
                +moment(b.time).format("x") - +moment(a.time).format("x")
            )
            .map((e) => (
              <div className={cx("content")} key={e.id}>
                <div>
                  <Paper fill={iconTheme[themeData?.themeName!] || undefined} />
                  <span>{e.text}</span>
                </div>
                <span className={cx("time")}>
                  {moment(e.time).format("YYYY/MM/DD HH:mm")}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Timelines;
