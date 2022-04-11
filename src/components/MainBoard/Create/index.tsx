import React, { useRef, useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { addFormdata, Tag } from "../../../todo.model";

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
const Create: React.FC<NewTodoProps> = (props) => {
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
  console.log(watch("taskName"), errors);
  return (
    <>
      <div className={cx("add-title")} onClick={() => setIsOpen(!isOpen)}>
        <button>Add a new task +</button>
      </div>
      {isOpen && (
        <form
          onSubmit={handleSubmit(todoSubmitHandler)}
          className={cx("form-card")}
        >
          <div
            onClick={() => {
              setIsOpen(false);
              reset();
            }}
            className={cx("cancel")}
          >
            X
          </div>
          <div className={cx("form-control")}>
            <label className={cx("form-label")} htmlFor="todo-text">
              Task Name
            </label>
            <input
              {...register("taskName", { required: true })}
              id="todo-text"
            />
          </div>
          <div className={cx("form-control")}>
            <label className={cx("form-label")} htmlFor="todo-tag">
              Task Tag
            </label>
            <select {...register("taskTag", { required: true })}>
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
            <div
              className={cx("blue-link")}
              onClick={() => setIsOpenTag(!isOpenTag)}
            >
              + Add Tags
            </div>
            {isOpenTag && (
              <div>
                <input
                  type="text"
                  placeholder="drama,foods...etc"
                  ref={textInputRef}
                />{" "}
                <button onClick={tagHandler}>Add</button>
              </div>
            )}
          </div>
          <div className={cx("form-control")}>
            <label className={cx("form-label")} htmlFor="todo-time">
              Task Time
            </label>
            <input
              {...register("taskTime", { required: true })}
              type="datetime-local"
              id="todo-time"
            />
          </div>
          <button type="submit" disabled={!isValid}>
            Create
          </button>
        </form>
      )}
    </>
  );
};

export default Create;
