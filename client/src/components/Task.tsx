import { useState } from "react";
import { Checkbox, TrashIcon } from ".";
import { Task as TaskType } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ListTasksResponse } from "../api/listTasks";
import { toast } from "react-toastify";
import { updateTask } from "../api/updateTask";
import { deleteTask } from "../api/deleteTask";

type TaskProps = {
  task: TaskType;
};

export const Task = ({ task }: TaskProps) => {
  const initialTaskName = task.title;
  const [taskName, setTaskName] = useState<string>(initialTaskName);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(task.isDone);

  const queryClient = useQueryClient();
  const cache = queryClient.getQueriesData([
    "tasks",
  ])[0][1] as ListTasksResponse;

  const { mutate: updateTaskMutate } = useMutation({
    mutationFn: () =>
      updateTask({
        ...task,
        title:
          task.title.toLocaleLowerCase() !== taskName.toLocaleLowerCase()
            ? taskName
            : undefined,
        isDone,
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(["tasks", { id: data.id }], data);
    },
    onError: () => {
      queryClient.refetchQueries(["tasks"]);
    },
  });

  const { mutate: deleteTaskMutate } = useMutation({
    mutationFn: () => deleteTask(task),
    onSuccess: () => {
      queryClient.refetchQueries(["tasks"]);
    },
    onError: () => {
      queryClient.refetchQueries(["tasks"]);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);

    const isTaskNameEmpty = taskName.trim() === "";
    const isTaskNameUnchanged = taskName === initialTaskName;
    const hasTaskWithSameName = cache.results.some(
      (task) => task.title.toLocaleLowerCase() === taskName.toLocaleLowerCase()
    );

    if (isTaskNameUnchanged) return;

    if (isTaskNameEmpty) {
      setTaskName(initialTaskName);
      toast.error("Task name cannot be empty");
      return;
    }

    if (hasTaskWithSameName) {
      setTaskName(initialTaskName);
      toast.error("Task name already exists");
      return;
    }

    const isTaskNameChanged = taskName !== initialTaskName;

    if (!isTaskNameChanged) return;

    updateTaskMutate();
    toast.success("Task name updated successfully");
  };

  const handleDelete = () => {
    deleteTaskMutate();

    toast.success("Task deleted successfully");
  };

  const handleCheckIsDone = () => {
    setIsDone(!isDone);
    updateTaskMutate();

    const message = isDone ? "undone" : "done";
    toast.success(`Task marked as ${message} successfully`);
  };

  return (
    <section className="w-full flex items-center justify-center m-12">
      <div className="w-1/2 flex items-center justify-between m-5">
        <div title="Mark as done ✨">
          <Checkbox isChecked={isDone} onCheck={handleCheckIsDone} />
        </div>
        {isEditing ? (
          <input
            type="text"
            className="text-xl text-default dark:text-primary"
            value={taskName}
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoFocus // Optional: To automatically focus the input when editing starts
          />
        ) : (
          <p
            // add underline when task is done
            className={`text-2xl text-default dark:text-primary ${
              isDone
                ? "line-through decoration-blue-500 dark:decoration-white"
                : ""
            }`}
            onDoubleClick={handleEditClick}
            title="Double click to edit ✏️"
          >
            {taskName}
          </p>
        )}
        <div title="Delete task" onClick={() => handleDelete()}>
          <TrashIcon />
        </div>
      </div>
    </section>
  );
};
