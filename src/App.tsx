import { Route, Routes } from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import NotFound from "./components/PageNotFound";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import TaskDetails from "./pages/TaskDetails";
import Dashboard from "./pages/Dashboard";
import { useState, useEffect } from "react";
import type { Task } from "./types/task";
import {getTasks, deleteTaskApi,} from "./services/taskService";

export default function App() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {

    const fetchTasks = async () => {
      try {
        const res = await getTasks();
        setTasks(res);
      } catch (err) {
        setError(
          "Something went wrong. Unable to fetch the tasks."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();

  }, []);

  const addTaskToList = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const taskUpdate = (task: Task) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === task.id ? task : item
      )
    );
  };

  const deleteTask = async (id: string) => {
    try {

      await deleteTaskApi(id);

      setTasks((prev) =>
        prev.filter((task) => task.id !== id)
      );

    } catch (err) {
      setError("Unable to delete the task");
    }
  };

  const handleFilter = async (filterType: string, search: string) => {
    try {
      setLoading(true);

      const res = await getTasks(
        filterType,
        search
      );

      setTasks(res);

    } catch (err) {

      setError("Unable to fetch filtered tasks");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="app">

      <Navbar />

      <div className="layout">

        <Sidebar />

        <Routes>
          <Route path="/" element={<Dashboard tasks={tasks} />} />

          <Route path="/tasks" element={<TaskList tasks={tasks} onDeleteTask={deleteTask} loading={loading} error={error}
            onFilter={handleFilter} />}
          />

          <Route path="/tasks/add" element={<AddTask onTaskAdded={addTaskToList} />} />
          
          <Route path="/tasks/edit/:id" element={<EditTask tasks={tasks} taskEdited={taskUpdate} />} />

          <Route path="/tasks/:id" element={<TaskDetails />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>

      <Footer />

    </div>
  );
}