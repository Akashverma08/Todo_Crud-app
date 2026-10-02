import type { Task } from "../types/task";
import { useParams } from "react-router";
import { getTaskById } from "../services/taskService";
import { useState, useEffect } from "react";

export default function TaskDetails() {
    const { id } = useParams();

    const [fetchSingleTask, setFetchSingleTask] =useState<Task | null>(null);
    useEffect(() => {
        const getSingleTask = async () => {
            try {
                const task = await getTaskById(String(id));
                setFetchSingleTask(task);
            } catch (err) {
                console.log("Error fetching task");
            }
        };

        getSingleTask();
    }, [id]);

    return (
        <div className="user-card-container">
            <div className="user-card">

                <h2>Task Details</h2>

                <ul>
                    <li>
                        <strong>ID:</strong>{" "}
                        {fetchSingleTask?.id}
                    </li>

                    <li>
                        <strong>Title:</strong>{" "}
                        {fetchSingleTask?.title}
                    </li>

                    <li>
                        <strong>Description:</strong>{" "}
                        {fetchSingleTask?.description}
                    </li>

                    <li>
                        <strong>Status:</strong>{" "}
                        {fetchSingleTask?.status}
                    </li>

                    <li>
                        <strong>Priority:</strong>{" "}
                        {fetchSingleTask?.priority}
                    </li>
                </ul>

            </div>
        </div>
    );
}