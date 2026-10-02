import { Link } from "react-router";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/">
        <h3>Dashboard</h3>
      </Link>

      <Link to="/tasks">
        <h3>List</h3>
      </Link>
    </aside>
  );
}