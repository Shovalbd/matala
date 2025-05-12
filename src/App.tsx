import { useEffect, useState } from 'react'
import Login from './components/Login';
import Post from './components/Post';
import Profile from './components/Profile';
import Register from './components/Register';
import { GET } from './tools';
import User from './interface/User';
import { Page } from './interface/Page';
import "./App.css"

function App() {
    const [page, setPage]       = useState<Page>("Login")
    const [isLogin , setLogin]  = useState(false);
    const [user , setUser]      = useState<User>({} as User);

    useEffect(()=>{
        GET("/user/")
        .then(d=>{
            let profile :User = d.data
            setLogin(true)
            setPage("Post")
            setUser(profile)
        })
        .catch(err=>{
            setLogin(false)
            setUser({} as User)
            setPage("Login")
        })
    },[])


    if(!isLogin && page == "Login")
        return <Login page={page} setPage={setPage} user={user} setUser={setUser} isLogin={isLogin} setLogin={setLogin}/>;
    else if(!isLogin && page == "Register") 
        return <Register page={page} setPage={setPage} user={user} setUser={setUser} isLogin={isLogin} setLogin={setLogin}/>;
    else if(isLogin && page == "Post")
        return <Post page={page} setPage={setPage} user={user} setUser={setUser}  isLogin={isLogin} setLogin={setLogin}/>;
    else if(isLogin && page == "Profile")
        return <Profile page={page} setPage={setPage} user={user} setUser={setUser}  isLogin={isLogin} setLogin={setLogin}/>;

}

export default App
