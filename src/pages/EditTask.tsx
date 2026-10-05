import { useParams, useNavigate } from "react-router";
import type { Task } from "../types/task";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { updateTask } from "../redux/taskSlice";
import { updatedTaskApi } from "../services/taskService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { taskValidationSchema } from "../validation/taskValidation";

export default function EditTask() {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch=useDispatch<AppDispatch>()
    const tasks=useSelector((state:RootState)=> state.tasks.tasks)
    const singleTask = tasks.find((task) => task.id === id);

    return (
        <div className="user-form-page">
            <h1>Edit Task</h1>
            <hr />
            <Formik
                initialValues={{
                    title: singleTask?.title || "",
                    description: singleTask?.description || "",
                    status: singleTask?.status || "pending",
                    priority: singleTask?.priority || "medium",
                }}

                validationSchema={taskValidationSchema}

                onSubmit={async (values, { setStatus }) => {

                    const updateTaskData = {
                        title: values.title,
                        description: values.description,
                        status: values.status,
                        priority: values.priority,
                    };

                    try {
                        const result = await updatedTaskApi(String(id),updateTaskData);

                        console.log("PATCH RESULT:", result);

                        const updatedTask: Task = {
                            id: String(id),
                            title: result.title,
                            description: result.description,
                            status: result.status,
                            priority: result.priority,
                        };

                        dispatch(updateTask(updatedTask));
                        navigate("/tasks");

                    } catch (err) {
                        console.log(err);
                        setStatus("Something went wrong, unable to edit.");
                    }
                }}
            >

                {({ status }) => (

                    <Form className="user-form">

                        {status && (
                            <p className="form-error">
                                {status}
                            </p>
                        )}

                        <Field
                            type="text"
                            name="title"
                            placeholder="Enter task title"
                        />

                        <ErrorMessage
                            name="title"
                            component="p"
                            className="form-error"
                        />

                        <Field
                            as="textarea"
                            name="description"
                            placeholder="Enter task description"
                        />

                        <ErrorMessage
                            name="description"
                            component="p"
                            className="form-error"
                        />

                        <Field as="select" name="status">

                            <option value="pending">
                                Pending
                            </option>

                            <option value="in-progress">
                                In Progress
                            </option>

                            <option value="completed">
                                Completed
                            </option>

                        </Field>

                        <ErrorMessage
                            name="status"
                            component="p"
                            className="form-error"
                        />

                        <Field as="select" name="priority">

                            <option value="low">
                                Low
                            </option>

                            <option value="medium">
                                Medium
                            </option>

                            <option value="high">
                                High
                            </option>

                        </Field>

                        <ErrorMessage
                            name="priority"
                            component="p"
                            className="form-error"
                        />

                        <button type="submit">
                            Update Task
                        </button>

                    </Form>
                )}

            </Formik>

        </div>
    );
}