
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";



export default function Dashboard() {
    const tasks = useSelector((state: RootState) => state.tasks.tasks)
    const total = tasks.length;
    const inProgress = tasks.filter(
        (task) => task.status === "in-progress"
    ).length;

    const completed = tasks.filter(
        (task) => task.status === "completed"
    ).length;

    const pending = tasks.filter(
        (task) => task.status === "pending"
    ).length;

    return (
        <div className="dashboard-page">
            <h1>Dashboard</h1>
            <hr />

            <div className="dashboard-card">
                <h2>Total Tasks</h2>
                <p>{total}</p>
            </div>

            <div className="dashboard-card">
                <h2>In-Progress</h2>
                <p>{inProgress}</p>
            </div>

            <div className="dashboard-card">
                <h2>Completed</h2>
                <p>{completed}</p>
            </div>

            <div className="dashboard-card">
                <h2>Pending</h2>
                <p>{pending}</p>
            </div>
        </div>
    );
}
