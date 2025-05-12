import { useEffect, useState } from "react";
import Prop from "../interface/Prop";
import Menu from "./menu";
import PostI from "../interface/Post";
import { DELETE, GET, POST, PUT } from "../tools";
import Comment from "../interface/Comment";
import { useForm } from "react-hook-form";
import { CommentForm, PostForm } from "../interface/FormsInputs";
import validation from "../validation";

export default function Post(props :Prop){
    let [posts , setPosts] = useState<PostI[]>([]);
    let [comments , setComments] = useState<Comment[]>([]);
    let [post , setPost] = useState<PostI>();

    const {register,reset,handleSubmit ,formState:{errors}} = useForm<PostForm>();

    useEffect(()=>{
        GET("/posts/")
        .then((data)=>{
            let p :PostI[] = data.data;
            setPosts(p)
        })
        .catch((err)=>{})
    },[]);
    
    function clickPost(thePost:PostI){
        GET("/posts/"+thePost._id+"/comments/")
        .then((data)=>{
            let c:Comment[] = data.data;
            setPost(thePost);
            setComments(c);
        })
        .catch((err)=>{})
    }


    function addComment(data:CommentForm){
        POST("/comments/",{comment:data.content,postId:post?._id}).then(data=>{
            alert("The response was sent successfully.");
            setComments([...comments,{...data.data,owner:{username:props.user.username}}])
            reset();
        }).catch((err)=>{})
    }

    function addLike(p:PostI){
        POST("/posts/"+p._id+"/like/",{userId:p._id})
        .then(data=>{
            p.likes.push("...")
            setPosts([...posts])
        }).catch((err)=>{
            alert("You already liked it")
        })
    }


    function updatePost(p:PostI){
        let title = prompt("נושא:",p.title) as string;
        let content = prompt("תוכן:",p.content) as string;
        PUT("/posts/"+p._id ,{title:title,content:content})
        .then(data=>{
            alert("The post was edited successfully")
            p.title = title;
            p.content = content;
            setPosts([...posts]);
        })
        .catch((err)=>{})

    }

    function updateComment(c:Comment){
        let content = prompt("תוכן:",c.comment) as string;
        PUT("/comments/"+c._id,{comment:content}).then(data=>{
            alert("The response was successfully edited")
            c.comment = content;
            setComments([...comments])
        })
        .catch((err)=>{})
    }
    function deletePost(p:PostI){
        DELETE("/posts/"+p._id ).then(data=>{
            setPosts(posts.filter(po=>po._id!=p._id))
        }).catch((err)=>{})
    }

    function deleteComment(c:Comment){
        DELETE("/comments/"+c._id ).then(data=>{
            setComments(comments.filter(co=>co._id!=c._id))
        }).catch((err)=>{console.log("err",err)})
    }

    return(
        <div className="PostComponent">
            <Menu {...props} />
            <div className="post_list">
                {
                    posts.map(p=>{
                        let active = p._id == post?._id? "activePost" : ""
                        return(
                            <div className={`post_item border m-3 p-3 d-flex flex-column ${active}`} key={p._id} >
                                <div className="pointer  d-flex flex-column " onClick={()=>clickPost(p)}>
                                    <div className="post_title text-center text-decoration-underline fs-3">{p.title}</div>
                                    <div className="display_username  post_title text-center text-decoration-underline fs-6">{p.owner.username}</div>
                                    {
                                    p.owner.username == props.user.username ? 
                                    <div className="align-self-start mb-3 d-flex gap-2">
                                        <button className="align-self-start mb-3" style={{width:70}} onClick={()=>deletePost(p)}>del</button> 
                                        <button className="align-self-start mb-3" style={{width:70}} onClick={()=>updatePost(p)}>update</button> 
                                    
                                    </div>
                                        :
                                        <button  className="align-self-start mb-3" style={{width:70}} onClick={()=>addLike(p)}>LIKE {p.likes.length}</button> 
                                    }
                                </div>
                                {
                                post?._id == p._id && <div className="comments">
                                        <h6 className="text-start text-decoration-underline">context:</h6>
                                        <p>{p.content}</p>
                                        <h6 className="text-start text-decoration-underline">comments:</h6>
                                        {comments.map(c=>{
                                                return(
                                                    <div className="comment_item d-flex flex-column text-start border p-3 m-2" key={c._id}>
                                                        <div className="text-decoration-underline">{c.owner.username}</div>
                                                        <div className="">{c.comment}</div>
                                                        {c.owner.username == props.user.username && 
                                                            <div className="align-self-start mb-3 d-flex gap-2">
                                                                <button className="align-self-start mb-3" onClick={()=>deleteComment(c)}>del</button>
                                                                <button className="align-self-start mb-3" onClick={()=>updateComment(c)}>update</button>
                                                            </div>
                                                        }
                                                    </div>
                                                )
                                        })}
                                        <br/>
                                        <form className="m-auto mt-10 d-flex flex-column w-50" onSubmit={handleSubmit(addComment)}>
                                            <h6 className="text-center text-decoration-underline">add comment</h6>
                                            <label className="text-decoration-underline">context:</label>
                                            <textarea {...register("content",validation.post.content)}></textarea>
                                            {errors.content && <span className="text-danger">{errors.content.message}</span>}
                                            <br/>
                                            <input type="submit"/>
                                        </form>

                                </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
            <FormAddPost setPosts={setPosts} posts={posts} user={props.user}/>
        </div>
    )
}



function FormAddPost({setPosts , posts , user} :any){
    const {register,reset,handleSubmit ,formState:{errors}} = useForm<PostForm>();

    function addPost(data:PostForm){
        POST("/posts/",{title:data.title , content:data.content})
        .then(data=>{
            alert("Post sent successfully");
            setPosts([...posts,{...data.data,owner:{username:user.username}}])
            reset();
        }).catch((err)=>{
            alert("post not add")
        })
    }
    
    return(
            <form className="m-auto mt-5  d-flex flex-column w-50" onSubmit={handleSubmit(addPost)}>
                <h1 className="text-center text-decoration-underline">הוספת פוסט</h1>

                    <label>title:</label>
                    <textarea {...register("title",validation.post.title)}></textarea>
                    {errors.title && <span className="text-danger">{errors.title.message}</span>}
                    <br/>
                    <label>context:</label>
                    <textarea {...register("content",validation.post.content)}></textarea>
                    {errors.content && <span className="text-danger">{errors.content.message}</span>}
                    <br/>
                <input type="submit"/>
            </form>
    )
}