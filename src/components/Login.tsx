import { useForm } from "react-hook-form";
import Prop from "../interface/Prop";
import Menu from "./menu";
import validation from "../validation";
import { LoginForm } from "../interface/FormsInputs";
import { GET, POST } from "../tools";
import Auth from "../interface/Auth";
import User from "../interface/User";

export default function Login(props :Prop){
    let {register , handleSubmit, reset , formState:{errors}} = useForm<LoginForm>();

    function loginIn(data:LoginForm){
        POST("/auth/login",{email:data.email , password:data.password}).then( (d)=>{
            const auth :Auth = d.data;
            sessionStorage.setItem("token",auth.accessToken);
            props.setPage("Post");
            props.setLogin(true);
            GET("/user/")
            .then(data=>{
                let profile :User = data.data
                props.setUser(profile)
            })
        })
        .catch(err=>{
            alert("The email or password is incorrect.");
        })
    }

   return (
  <div>
    <Menu {...props} />

    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow rounded" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">
          <i className="bi bi-box-arrow-in-right me-2"></i>Login
        </h2>

        <form onSubmit={handleSubmit(loginIn)}>
          {/* Email Field */}
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

          {/* Password Field */}
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

          {/* Submit Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
                <i className="bi bi-arrow-right-circle me-1"></i>Log In
                </button>
            </div>
            </form>
        </div>
      </div>
     </div>
    );

}
