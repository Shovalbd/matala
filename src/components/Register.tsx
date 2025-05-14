import { useForm } from "react-hook-form";
import { RegisterForm } from "../interface/FormsInputs";
import Prop from "../interface/Prop";
import validation from "../validation";
import Menu from "./menu";
import { POST } from "../tools";

export default function Register(props :Prop){
    let {register , handleSubmit, reset , formState:{errors}} = useForm<RegisterForm>();

    function registerIn(data:RegisterForm){
        POST("/auth/register",{email:data.email, username: data.username, password:data.password})
        .then(d=>{
            alert("You have registered successfully"); 
            props.setPage("Login")
        })
        .catch(err=>{
            alert("Username or email exists in the system");
        })
    }

    return (
  <div>
    <Menu {...props} />

    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow rounded" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">
          <i className="bi bi-person-plus me-2"></i>Register
        </h2>

        <form onSubmit={handleSubmit(registerIn)}>
      
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <i className="bi bi-envelope me-2"></i>Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              {...register("email", validation.login.email)}
            />
            {errors.email && <div className="text-danger small mt-1">{errors.email.message}</div>}
          </div>

    
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <i className="bi bi-lock me-2"></i>Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              {...register("password", validation.login.password)}
            />
            {errors.password && <div className="text-danger small mt-1">{errors.password.message}</div>}
          </div>

          
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              <i className="bi bi-person me-2"></i>Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Username"
              {...register("username", validation.register.username)}
            />
            {errors.username && <div className="text-danger small mt-1">{errors.username.message}</div>}
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-person-plus-fill me-1"></i>Register
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

}


