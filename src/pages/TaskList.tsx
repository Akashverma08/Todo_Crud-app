
import { Link } from "react-router";
import type { Task } from "../types/task";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { setTasks, deleteTask } from "../redux/taskSlice";
import { getTasks, deleteTaskApi } from "../services/taskService";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";



export default function TaskList() {

    const dispatch = useDispatch<AppDispatch>();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const [search, setSearch] = useState("");
    const [filtertype, setFiltertype] = useState("");
    const [filterValue, setFilterValue] = useState("");


    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await getTasks(filtertype, search);
                dispatch(setTasks(res));

            } catch (err) {
                console.log(err);
                setError("Something went wrong. Unable to fetch the tasks.");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();

    }, [dispatch]);


    const handleDelete = async (id: string) => {
        try {
            await deleteTaskApi(id);
            dispatch(deleteTask(id));

        } catch (err) {
            console.log(err);
            alert("Unable to delete the Task");
        }
    };

    const handleFilter = async () => {
        try {
            setLoading(true);
            setError("");

            const value = filtertype === "status" || filtertype === "priority"
                    ? filterValue
                    : search;

            const res = await getTasks(filtertype, value);
            dispatch(setTasks(res));

        } catch (err) {
            console.log(err);
            setError("Unable to fetch filtered tasks");
        } finally {
            setLoading(false);
        }
    };


    const columns: GridColDef[] = [

        {
            field: "id",
            headerName: "ID",
            flex: 1.5,
            minWidth: 180,
        },

        {
            field: "title",
            headerName: "Title",
            flex: 1,
            minWidth: 130,
        },

        {
            field: "description",
            headerName: "Description",
            flex: 1.5,
            minWidth: 180,
        },

        {
            field: "status",
            headerName: "Status",
            flex: 1,
            minWidth: 120,
        },

        {
            field: "priority",
            headerName: "Priority",
            flex: 1,
            minWidth: 110,
        },

        {
            field: "actions",
            headerName: "Actions",
            flex: 1.5,
            minWidth: 250,

            renderCell: (params) => (
                <>
                    <Link to={`/tasks/edit/${params.row.id}`}>
                        <Button
                            variant="contained"
                            size="small"
                        >Edit</Button>
                    </Link>


                    <Link to={`/tasks/${params.row.id}`}>
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{ ml: 1 }}
                        > View</Button>
                    </Link>


                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ ml: 1 }}
                        onClick={() =>
                            handleDelete(params.row.id)
                        }
                    >    Delete </Button>
                </>

            ),
        },

    ];


    const rows = tasks.map((task: Task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
    }));


    return (

        <div className="user-list">

            <h1>Task List</h1>

            <hr />
            <div className="user-actions">
                <div className="filter-section">

                    {/* Search Input */}

                    <input className="search-input" type="text"
                        placeholder={
                            filtertype === "title"
                                ? "Search by title"
                                : filtertype === "description"
                                    ? "Search by description"
                                    : "Select filter first"
                        }
                        value={search}
                        disabled={filtertype === "status" ||filtertype === "priority" ||filtertype === ""}
                        onChange={(e) =>setSearch(e.target.value)}
                    />


                    {/* Main Filter */}

                    <select  value={filtertype} onChange={(e) => {setFiltertype(e.target.value);
                                                                  setSearch(""); 
                                                                   setFilterValue(""); }}
                    >
                        <option value="">Select Filter</option>
                        <option value="title">Title</option>
                        <option value="description"> Description </option>
                        <option value="status"> Status </option>
                        <option value="priority"> Priority </option>
                    </select>


                    {/* Status Filter */}

                    {filtertype === "status" && (

                        <select value={filterValue}  onChange={(e) => setFilterValue(e.target.value)} >
                            <option value="">Select Status </option>
                            <option value="pending"> Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    )}


                    {/* Priority Filter */}

                    {filtertype === "priority" && (
                        <select value={filterValue} onChange={(e) => setFilterValue(e.target.value) } >
                            <option value="">Select Priority</option>
                            <option value="low"> Low</option>
                            <option value="medium"> Medium</option>
                            <option value="high"> High</option>
                        </select>

                    )}

                    <button
                        type="button"
                        onClick={handleFilter}
                    >
                        Apply Filter
                    </button>

                </div>

                <Link to="/tasks/add">
                    <button className="add-user-btn"> Add Task</button>
                </Link>

            </div>

            {loading && <Loading />}

            {error && (<p className="form-error">{error}</p>)}


            <div
                style={{
                    width: "100%",
                    marginTop: "20px",
                }}
            >

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[10, 20, 30]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                                page: 0,
                            },
                        },
                    }}
                    autoHeight
                />

            </div>

        </div>

    );
}
