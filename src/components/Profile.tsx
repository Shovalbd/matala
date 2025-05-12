import { useForm } from "react-hook-form";
import Prop from "../interface/Prop";
import Menu from "./menu";
import { ProfileForm } from "../interface/FormsInputs";
import validation from "../validation";
import { PUT } from "../tools";

export default function Profile(props :Prop){
    let {register , handleSubmit, reset , formState:{errors}} = useForm<ProfileForm>();

    function updateProfile(data:ProfileForm){
        PUT("/user/update/" ,{id: props.user._id ,username:data.username , newPassword:data.password })
        .then(d=>{
            props.setUser(d.data)
            alert("Profile updated successfully")
        })
        .catch(err=> alert("Profile not updated"))
    }

    return(
        <form className="ProfileComponent" onSubmit={handleSubmit(updateProfile)}>
            <Menu {...props} />
            <h1 className="text-center">User Profile</h1>
            <br/>
            <div className="card m-auto" style={{width:"18rem"}}>
                <ul className="list-group list-group-flush p-0">
                    <li className="list-group-item">
                        <label className="d-block m-2 text-decoration-underline text-center" >email</label> 
                        <input className="form-control text-center" readOnly placeholder={props.user.email}/>
                    </li>
                    <li className="list-group-item">
                        <label className="d-block m-2 text-decoration-underline text-center" >username</label> 
                        <input defaultValue={props.user.username} className="form-control text-center"  {...register("username",validation.profile.username)}/>
                        {errors.username && <span className="text-danger">{errors.username.message}</span>}
                    </li>

                    <li className="list-group-item">
                        <label className="d-block m-2 text-decoration-underline text-center" >password</label> 
                        <input className="form-control text-center" {...register("password",validation.profile.password)}/>
                        {errors.password && <span className="text-danger">{errors.password.message}</span>}
                    </li>


                </ul>

                <input type="submit" className="btn btn-primary" />
            </div>
        </form>
    )
}