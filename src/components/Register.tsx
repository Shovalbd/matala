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

    return(
        <div> 
            <Menu {...props} />
            <form onSubmit={handleSubmit(registerIn)}>
                <h1 className="text-center">register</h1>

                <div className="form-group">
                    <label>email:</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" {...register("email",validation.login.email)} />
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                </div>
                <br/>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"  {...register("password",validation.login.password)}/>
                    {errors.password && <span className="text-danger">{errors.password.message}</span>}
                </div>
                <br/>
                <div className="form-group">
                    <label>username:</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="username" {...register("username",validation.register.username)} />
                    {errors.username && <span className="text-danger">{errors.username.message}</span>}
                </div>
                <br/>
                <input type="submit" className="btn btn-primary" />
            </form>
        </div>
    )
}


