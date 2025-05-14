import { useEffect, useState } from "react";
import Prop from "../interface/Prop";
import Menu from "./menu";
import PostI from "../interface/Post";
import { DELETE, GET, POST, PUT } from "../tools";
import Comment from "../interface/Comment";
import { useForm } from "react-hook-form";
import { CommentForm, PostForm } from "../interface/FormsInputs";
import validation from "../validation";

export default function Post(props: Prop) {
  const [posts, setPosts] = useState<PostI[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<PostI>();

  const { register, reset, handleSubmit, formState: { errors } } = useForm<PostForm>();

  useEffect(() => {
    GET("/posts/")
      .then((data) => setPosts(data.data))
      .catch(() => {});
  }, []);

  function clickPost(thePost: PostI) {
    if (post?._id === thePost._id) {
      setPost(undefined);
      setComments([]);
    } else {
      GET(`/posts/${thePost._id}/comments/`)
        .then((data) => {
          setPost(thePost);
          setComments(data.data);
        })
        .catch(() => {});
    }
  }

  function addComment(data: CommentForm) {
    POST("/comments/", { comment: data.content, postId: post?._id })
      .then((data) => {
        alert("The response was sent successfully.");
        setComments([...comments, { ...data.data, owner: { username: props.user.username } }]);
        reset();
      })
      .catch(() => {});
  }

  function addLike(p: PostI) {
    POST(`/posts/${p._id}/like/`, { userId: props.user._id })
      .then(() => {
        p.likes.push(props.user._id);
        setPosts([...posts]);
      })
      .catch(() => alert("You already liked this post"));
  }

  function updatePost(p: PostI) {
    const title = prompt("Subject:", p.title) as string;
    const content = prompt("Content:", p.content) as string;
    PUT(`/posts/${p._id}`, { title, content })
      .then(() => {
        alert("The post was edited successfully");
        p.title = title;
        p.content = content;
        setPosts([...posts]);
      })
      .catch(() => {});
  }

  function updateComment(c: Comment) {
    const content = prompt("Content:", c.comment) as string;
    PUT(`/comments/${c._id}`, { comment: content })
      .then(() => {
        alert("The response was successfully edited");
        c.comment = content;
        setComments([...comments]);
      })
      .catch(() => {});
  }

  function deletePost(p: PostI) {
    DELETE(`/posts/${p._id}`)
      .then(() => setPosts(posts.filter(po => po._id !== p._id)))
      .catch(() => {});
  }

  function deleteComment(c: Comment) {
    DELETE(`/comments/${c._id}`)
      .then(() => setComments(comments.filter(co => co._id !== c._id)))
      .catch(() => {});
  }

  return (
    <div className="container py-4">
      <Menu {...props} />
      <FormAddPost setPosts={setPosts} posts={posts} user={props.user} />

      <h3 className="text-center text-decoration-underline mt-5 mb-4">Post Feed</h3>

      <div className="row">
        {posts.map((p) => {
          const isActive = p._id === post?._id;

          return (
            <div className="col-12 mb-4" key={p._id}>
              <div
                className={`card shadow rounded-4 p-3 ${isActive ? "border-primary border-2" : ""}`}
                style={{ transition: "0.3s" }}
              >
                <div
                  className="text-center mb-2"
                  onClick={() => clickPost(p)}
                  style={{ cursor: "pointer" }}
                >
                  <h5 className="text-primary">{p.title}</h5>
                  <h6 className="text-muted">By {p.owner.username}</h6>
                </div>

                <div className="d-flex justify-content-center gap-3 mt-2 mb-3">
                  {p.owner.username === props.user.username ? (
                    <>
                      <button className="btn btn-sm btn-outline-danger rounded-pill" onClick={() => deletePost(p)}>Delete</button>
                      <button className="btn btn-sm btn-outline-secondary rounded-pill" onClick={() => updatePost(p)}>Edit</button>
                    </>
                  ) : (
                    <button className="btn btn-sm btn-outline-primary rounded-pill" onClick={() => addLike(p)}>
                      ❤️ Like {p.likes.length}
                    </button>
                  )}
                </div>

                {isActive && (
                  <div className="mt-4 px-2">
                    <h6 className="fw-bold text-decoration-underline">Content:</h6>
                    <p>{p.content}</p>

                    <h5 className="text-decoration-underline mt-4 d-flex align-items-center gap-2 justify-content-center">
                      <i className="bi bi-chat-left-heart-fill text-danger"></i>
                      <span className="fw-bold">Comments</span>
                    </h5>

                    <div className="p-3 bg-light rounded-4 mt-3">
                      {comments.map((c) => (
                        <div className="bg-white border rounded-4 shadow-sm p-3 mb-3" key={c._id}>
                          <strong>{c.owner.username}</strong>
                          <p className="mb-2">{c.comment}</p>
                          {c.owner.username === props.user.username && (
                            <div className="d-flex gap-2">
                              <button className="btn btn-sm btn-outline-danger rounded-pill" onClick={() => deleteComment(c)}>Delete</button>
                              <button className="btn btn-sm btn-outline-secondary rounded-pill" onClick={() => updateComment(c)}>Edit</button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <form className="mt-4" onSubmit={handleSubmit(addComment)}>
                      <h6 className="text-center text-decoration-underline mb-3">Add Comment</h6>
                      <div className="mb-3">
                        <label className="form-label">Content:</label>
                        <textarea
                          className="form-control"
                          {...register("content", validation.post.content)}
                        />
                        {errors.content && (
                          <div className="text-danger mt-1">{errors.content.message}</div>
                        )}
                      </div>

                      <button type="submit" className="btn btn-primary w-100 rounded-pill">
                        Submit Comment
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FormAddPost({ setPosts, posts, user }: any) {
  const { register, reset, handleSubmit, formState: { errors } } = useForm<PostForm>();

  function addPost(data: PostForm) {
    POST("/posts/", { title: data.title, content: data.content })
      .then((data) => {
        alert("Post sent successfully");
        setPosts([...posts, { ...data.data, owner: { username: user.username } }]);
        reset();
      })
      .catch(() => alert("Post not added"));
  }

  return (
    <form
      className="mt-5 p-4 shadow-sm rounded-4 bg-light"
      onSubmit={handleSubmit(addPost)}
    >
      <h3 className="text-center text-decoration-underline mb-4">Add Post</h3>

      <div className="mb-3">
        <label className="form-label">Title:</label>
        <textarea
          className="form-control"
          {...register("title", validation.post.title)}
        />
        {errors.title && (
          <div className="text-danger">{errors.title.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Content:</label>
        <textarea
          className="form-control"
          {...register("content", validation.post.content)}
        />
        {errors.content && (
          <div className="text-danger">{errors.content.message}</div>
        )}
      </div>

      <button type="submit" className="btn btn-primary w-100 rounded-pill">
        Submit Post
      </button>
    </form>
  );
}
