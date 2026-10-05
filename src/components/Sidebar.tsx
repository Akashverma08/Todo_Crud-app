import { Link, useNavigate } from "react-router";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("login")
  }
  return (
    <aside className="sidebar">
      <Link to="/dashboard">
        <h3>Dashboard</h3>
      </Link>

      <Link to="/tasks">
        <h3>List</h3>
      </Link>

      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}