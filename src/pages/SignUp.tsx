
import {signupValidation} from "../validation/signupValidation";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {signUpApi} from "../services/authService"
import {useNavigate} from "react-router";
import type{Sign} from "../types/sign"
export default function SignUp() {

    const navigate=useNavigate();

    const handleSubmit=(async(values :{name:string,email:string,password:string})=>{

        const newUser:Sign={
            name:values.name,
            email:values.email,
            password:values.password
        }

        try{
             const result=await signUpApi(newUser);
             if(result){
                navigate("/login");
             }


        }catch(err){
            console.log("error");
        }
    })
    
    return (
        
        <div className="login-page">
            <div className="login-card">
                <h1>SIgn Up</h1>

                <Formik 
                   initialValues={{
                    name:"",
                    email:"",
                    password:""
                   }}

                   validationSchema={signupValidation}
                   onSubmit={handleSubmit}  
                >
                    <Form>

                        <div className="form-field">
                            <label>Name:</label>
                            <Field
                              type="text"
                              name="name"
                              placeholder="enter the name"
                            />
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="error"
                            />

                            <label>Email:</label>
                            <Field
                               name="email"
                               type="email"
                               placeholder="enter the email"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="error"
                            />
                            


                            <label>Password:</label>
                            <Field
                              type="password"
                              name="password"
                              placeholder="Enter the password"
                            />
                            <ErrorMessage
                               name="password"
                               component="div"
                               className="error"
                            />

                        </div>

                        <button type="submit">Sign Up</button>

                    </Form> 

                </Formik>




            </div>
        </div>
    );


}