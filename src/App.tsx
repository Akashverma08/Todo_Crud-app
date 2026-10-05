import { Route, Routes,useLocation } from "react-router";
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
import Login from "./pages/Login";
import Protected from "./pages/Protected";
import SignUp from "./pages/SignUp";


export default function App() {

  const location =useLocation();
  const isLoginPage=location.pathname==="/login" || location.pathname==="/signup";

  return (
    <div className="app">

      <Navbar />

      <div className="layout">

        {!isLoginPage && <Sidebar /> }

        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>

          <Route path="/dashboard" element={<Protected Component={<Dashboard />} />}/>

          <Route path="/" element={<Protected Component={<TaskList/>}  />} />

          <Route path="/tasks" element={<Protected Component={<TaskList />} />}/>

          <Route path="/tasks/add" element={<Protected Component={<AddTask />} />} />
          
          <Route path="/tasks/edit/:id" element={<Protected Component={<EditTask />} />} />

          <Route path="/tasks/:id" element={<Protected Component={<TaskDetails/>} />}/>

          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>

      {!isLoginPage && <Footer />}

      

    </div>
  );
}