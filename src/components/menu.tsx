import Prop from "../interface/Prop";
import User from "../interface/User";

export default function Menu(props: Prop) {
  return (
     <nav className="navbar navbar-expand-lg navbar-light bg-primary bg-opacity-10 shadow-sm rounded p-3 mb-4">
      <div className="container justify-content-center">
        <ul className="navbar-nav d-flex flex-row gap-5">
          {!props.isLogin && (
            <>
              <li className="nav-item">
                <span className="nav-link pointer" onClick={() => props.setPage("Login")}>
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link pointer" onClick={() => props.setPage("Register")}>
                  <i className="bi bi-person-plus me-2"></i>
                  Register
                </span>
              </li>
            </>
          )}

          {props.isLogin && (
            <>
              <li className="nav-item">
                <span className="nav-link pointer" onClick={() => props.setPage("Post")}>
                  <i className="bi bi-card-text me-2"></i>
                  Posts
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link pointer" onClick={() => props.setPage("Profile")}>
                  <i className="bi bi-person-circle me-2"></i>
                  Profile
                </span>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link pointer"
                  onClick={() => {
                    sessionStorage.removeItem("token");
                    props.setLogin(false);
                    props.setPage("Login");
                    props.setUser({} as User);
                  }}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
