
import type { Task } from "../types/task";

interface DashboardProps {
    tasks: Task[];
}

export default function Dashboard({ tasks }: DashboardProps) {
    const total = tasks.length;

    return (
        <div className="dashboard-page">
            <h1>Dashboard</h1>
            <hr />

            <div className="dashboard-card">
                <h2>Total Tasks</h2>
                <p>{total}</p>
            </div>
        </div>
    );
}
