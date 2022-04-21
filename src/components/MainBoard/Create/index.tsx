import React, { useRef, useContext, useState } from "react";
import { ColorThemeStorage } from "../../../contexts/ColorTheme";

import { useForm, SubmitHandler } from "react-hook-form";
import { addFormdata, Tag } from "../../../todo.model";
import moment from "moment";

import classNames from "classnames/bind";
import classes from "./styles.module.scss";

const cx = classNames.bind(classes);
type NewTodoProps = {
  onAddTodo: (data: addFormdata) => void;
  onAddTag: (text: string) => void;
  tags: Tag[];
};
interface FormData {
  taskName: string;
  taskTime: string;
  taskTag: string;
}
interface styleType {
  btnstyle: { [key: string]: string };
  formstyle: { [key: string]: string };
  textstyle: { [key: string]: string };
}
const Create: React.FC<NewTodoProps> = (props) => {
  const themeData = useContext(ColorThemeStorage);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTag, setIsOpenTag] = useState(false);
  const { register, handleSubmit, reset, watch, setValue, formState } =
    useForm<FormData>({ mode: "onChange" });
  const { isValid, errors } = formState;
  const textInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler: SubmitHandler<FormData> = (data) => {
    props.onAddTodo(data);
    setIsOpen(false);
    reset();
  };
  const tagHandler = () => {
    const enteredText = textInputRef.current!.value;
    if (!enteredText) {
      return;
    }
    props.onAddTag(enteredText);
    setIsOpenTag(false);
    setValue("taskTag", enteredText);
  };
  const styleMap: styleType = {
    btnstyle: {
      dark: "btnDark",
      light: "btnLight",
    },
    formstyle: {
      dark: "form-card-dark",
      light: "form-card-light",
    },
    textstyle: {
      dark: "t-dark",
      light: "t-light",
    },
  };
  return (
    <>
      <div
        className={cx("add-title")}
        onClick={() => {
          setIsOpen(!isOpen);
          setValue("taskTime", moment().format("YYYY-MM-DDTHH:mm"));
        }}
      >
        <button
          className={
            "btn " + cx(themeData && styleMap.btnstyle[themeData?.themeName])
          }
        >
          Add a new task +
        </button>
      </div>
      {isOpen && (
        <form
          onSubmit={handleSubmit(todoSubmitHandler)}
          className={cx(
            "form-card",
            themeData && styleMap.formstyle[themeData?.themeName]
          )}
        >
          <div
            onClick={() => {
              setIsOpen(false);
              reset();
              setIsOpenTag(false);
            }}
            className={cx("cancel")}
          >
            X
          </div>
          <div className={cx("form-control")}>
            <label
              className={cx(
                "form-label",
                themeData && styleMap.textstyle[themeData?.themeName]
              )}
              htmlFor="todo-text"
            >
              Task Name
            </label>
            <input
              {...register("taskName", { required: true })}
              id="todo-text"
            />
          </div>
          <div className={cx("form-control")}>
            <label
              className={cx(
                "form-label",
                themeData && styleMap.textstyle[themeData?.themeName]
              )}
              htmlFor="todo-tag"
            >
              Task Tag
            </label>

            <select {...register("taskTag", { required: true })}>
              <option
                key={"Please select one tag"}
                value={""}
                selected={watch("taskTag") === ""}
              >
                --Please Select--
              </option>
              {props.tags.map((e) => (
                <option
                  key={e.id}
                  value={e.text}
                  selected={watch("taskTag") === e.text}
                >
                  {e.text}
                </option>
              ))}
            </select>

            {!isOpenTag && (
              <div
                className={cx("blue-link")}
                onClick={() => {
                  setIsOpenTag(true);
                }}
              >
                + Add Tags
              </div>
            )}
            {isOpenTag && (
              <div className={cx("addTagCard")}>
                <input
                  type="text"
                  placeholder="Lessons,Skills...etc"
                  ref={textInputRef}
                />{" "}
                <button className={"btn " + cx("addBtn")} onClick={tagHandler}>
                  Add
                </button>
                <button
                  className={"btn " + cx("cancelBtn")}
                  onClick={() => setIsOpenTag(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className={cx("form-control")}>
            <label
              className={cx(
                "form-label",
                themeData && styleMap.textstyle[themeData?.themeName]
              )}
              htmlFor="todo-time"
            >
              Task Time
            </label>
            <input
              {...register("taskTime", { required: true })}
              type="datetime-local"
              id="todo-time"
            />
          </div>
          <button
            className={"btn " + cx("createBtn")}
            type="submit"
            disabled={!isValid}
          >
            Create
          </button>
        </form>
      )}
    </>
  );
};

export default Create;
