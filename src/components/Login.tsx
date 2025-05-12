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

    return(
        <div> 
            <Menu {...props} />
            <form onSubmit={handleSubmit(loginIn)}>
                <h1 className="text-center">login</h1>
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
                <input type="submit" className="btn btn-primary" />
            </form>
        </div>
    )
}
