"use client";
import { useCallback, useEffect, useState } from "react";
import CommonTaskModal from "./CommonTaskModal";
import type { Task } from "../interface/task.interface";
import Loader from "./Loader";
import {useRouter} from "next/navigation"

const TaskTable = () => {
  const userId = localStorage.getItem("id");
  const router = useRouter();

  const [data, setData] = useState<Task[] | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>();

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/task/${userId}`,
        { withCredentials: true }
      );
      const tasks: Task[] = response.data;
      setData(tasks);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const deleteTask = async (taskId: string) => {
    setIsLoading(true);
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/task/delete/${taskId}`,
      {
        withCredentials: true,
      }
    );
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, openAddModal, openEditModal]);

  return (
    <div>
      <div className="h-[80px] w-full bg-gray-400 px-6 flex items-center justify-between">
        <button
          onClick={() => setOpenAddModal(true)}
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
        >
          + Add Task
        </button>
        <button
          onClick={async () => {
            localStorage.clear();
            router.push("/");
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
        >
          Log out
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Edit</th>
                <th className="px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((taskObj) => (
                <tr key={taskObj._id} className="bg-gray-100 border-b">
                  <td className="px-6 py-4">{taskObj.title}</td>
                  <td className="px-6 py-4">{taskObj.description}</td>
                  <td className="px-6 py-4">{taskObj.status}</td>

                  <td
                    className="px-6 py-4 text-blue-600 cursor-pointer"
                    onClick={() => {
                      setSelectedTask(taskObj);
                      setOpenEditModal(true);
                    }}
                  >
                    Edit
                  </td>
                  <td
                    className="px-6 py-4 text-red-600 cursor-pointer"
                    onClick={() => deleteTask(taskObj._id as string)}
                  >
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {openAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <CommonTaskModal setOpenModal={setOpenAddModal} title="New Task" />
        </div>
      )}
      {openEditModal && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <CommonTaskModal
            setOpenModal={setOpenEditModal}
            title="Edit Task"
            task={selectedTask}
          />
        </div>
      )}
    </div>
  );
};

export default TaskTable;
