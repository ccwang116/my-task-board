import React, { useState, useContext } from "react";
import { ReactComponent as Paper } from "../../../images/note-sticky-regular.svg";

import Trash from "../../../images/trash-can-regular.svg";
import { ColorThemeStorage } from "../../../contexts/ColorTheme";

import moment from "moment";
import classNames from "classnames/bind";
import classes from "../styles.module.scss";
import { Todo, Tag } from "../../../todo.model";
import { colorArray } from "../../../data/tagColorList";
import CardHead from "../../DesignSystem/CardHead";

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
  const themeData = useContext(ColorThemeStorage);
  const [styleStatus, setStyleStatus] = useState<string>();
  const [dragStartNum, setDragStartNum] = useState<number>(-1);
  const [dragEndNum, setDragEndNum] = useState<number>(-1);
  const { onSwap } = props;
  const iconTheme: { [key: string]: string } = {
    dark: "#fff",
    light: "#4a4d4e",
  };
  return (
    <div className={cx("task-card", { "task-card-half": props.isShowLabel })}>
      <CardHead title={props.title} />
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
                <Paper fill={iconTheme[themeData?.themeName!] || undefined} />
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
                  onChange={(evt) => {
                    props.completeHandler(e.id);
                  }}
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
