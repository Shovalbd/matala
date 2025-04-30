import Prop from "../interface/Prop";
import Menu from "./menu";

export default function Profile(props :Prop){

    return(
        <div className="ProfileComponent">
            <Menu {...props} />
            <h1 className="text-center">פרופיל המשתמש</h1>
            <br/>
            <div className="card m-auto" style={{width:"18rem"}}>
                <ul className="list-group list-group-flush text-start">
                    <li className="list-group-item">username: {props.user.username}</li>
                    <li className="list-group-item">email: {props.user.email}</li>
                </ul>
            </div>
        </div>
    )
}