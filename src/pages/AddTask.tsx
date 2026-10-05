import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch} from "react-redux";
import type { AppDispatch } from "../redux/store";
import { addTask } from "../redux/taskSlice";
import { addNewTask } from "../services/taskService";
import { useNavigate } from "react-router";
import { taskValidationSchema } from "../validation/taskValidation";
import { useState } from "react";



export default function AddTask() {
  const dispatch=useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="user-form-page">

      <h1>Add Task</h1>
      <hr />

      <Formik
        initialValues={{
          title: "",
          description: "",
          status: "pending",
          priority: "medium",
        }}

        validationSchema={taskValidationSchema}

        onSubmit={async (values) => {

          const newTask = {
            title: values.title,
            description: values.description,
            status: values.status,
            priority: values.priority,
          };

          try {
            setLoading(true);
            const res = await addNewTask(newTask);
            dispatch(addTask(res));
            navigate("/tasks");
          } catch (err) {
            console.log(err);
          } finally {
            setLoading(false);
          }
        }}
      >

        <Form className="user-form">

          <Field
            type="text"
            name="title"
            placeholder="Enter task title"
          />
          <ErrorMessage name="title" />

          <Field
            as="textarea"
            name="description"
            placeholder="Enter task description"
          />
          <ErrorMessage name="description" />

          <Field as="select" name="status">
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </Field>
          <ErrorMessage name="status" />

          <Field as="select" name="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Field>
          <ErrorMessage name="priority" />

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Task"}
          </button>

        </Form>

      </Formik>

    </div>
  );
}