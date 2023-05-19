import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listTasks } from "../../api/listTasks";
import { Task } from "../../components/Task";
import { useState } from "react";
import { createTask } from "../../api/createTask";
import { toast } from "react-toastify";
import { TasksPaginator } from "../../components/TasksPaginator";

export const Tasks = () => {
  const [page, setPage] = useState(1);
  const DEFAULT_LIMIT = 3;

  const queryClient = useQueryClient();
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["tasks", page],
    queryFn: () => listTasks({ page, limit: DEFAULT_LIMIT }),
  });

  const { mutate } = useMutation({
    mutationFn: () => createTask("Type your task name here"),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", page]);
    },
  });

  if (isLoading) return <h1>Loading...</h1>;

  const handleAddTask = async () => {
    const lastPage = Math.ceil((data?.total || 0) / DEFAULT_LIMIT);

    if (data?.total !== 0 && page !== lastPage) {
      setPage(lastPage);
      await refetch({
        queryKey: ["tasks", lastPage],
      });
    }

    const hasSomeTaskNotEdited = data?.results?.some(
      (task) => task.title === "Type your task name here"
    );

    if (hasSomeTaskNotEdited) {
      toast.error("Finish editing the task before adding a new one");
      return;
    }

    mutate();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl text-default dark:text-primary mt-10">Tasks</h1>
      {data?.results?.map((task) => (
        <Task key={task.id} task={task} />
      ))}
      <button
        className="rounded-full bg-default dark:bg-primary text-white dark:text-default p-3 mt-5"
        onClick={handleAddTask}
      >
        Adicionar
      </button>
      {!!data?.total && data.total > DEFAULT_LIMIT && (
        <TasksPaginator
          count={data?.total}
          page={data.page}
          onPageChange={(newValue) => setPage(newValue)}
          perPage={DEFAULT_LIMIT}
        />
      )}
    </div>
  );
};
