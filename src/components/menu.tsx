import Prop from "../interface/Prop";
import User from "../interface/User";

export default function Menu(props :Prop){



    return(
        <div className="MenuComponent d-flex flex-column align-items-center justify-content-center m-4 border-bottom">
            <ul className=" d-flex justify-content-center gap-5">
                {!props.isLogin && <li className="pointer nav-item nav-link" onClick={()=>props.setPage("Login")} >login</li>}
                {!props.isLogin && <li className="pointer nav-item nav-link" onClick={()=>props.setPage("Register")} >register</li>}
                {props.isLogin  && <li className="pointer nav-item nav-link" onClick={()=>props.setPage("Post")} >posts</li>}
                {props.isLogin  && <li className="pointer nav-item nav-link" onClick={()=>props.setPage("Profile")} >profile</li>}
                {props.isLogin  && <li className="pointer nav-item nav-link" onClick={()=>{sessionStorage.removeItem("token");props.setLogin(false);props.setPage("Login");props.setUser({} as User)}} >logout</li>}
            </ul>
        </div>
    )
}