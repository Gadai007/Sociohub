import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { postsLoad, postLiked, postUnliked, postComment } from "../store/posts";
import M from "materialize-css";

const Home = () => {
  const reload = useSelector((state) => state.entities.posts.reload);
  const userId = JSON.parse(localStorage.getItem("jwt")).user.id;
  const posts = useSelector((state) => state.entities.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postsLoad());
  }, [reload]);
  

  const sumbitHandler = (postId, text) => {
    if (text === "") {
      return M.toast({
        html: "comment cannot be empty",
        classes: "#b71c1c red darken-4",
      });
    }
    dispatch(postComment(postId, text));
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col s12 m8 offset-m2">
            {posts.length !== 0 ? (
              posts.map((post) => {
                return (
                  <Fragment key={post._id}>
                    <div className="card #ff80ab pink accent-1">
                      <div className="card-content white-text hoverable">
                        {userId !== post.postedBy._id ? (
                          <Link to={`/profile/${post.postedBy._id}`} style={{ color: '#FFF' }}>
                            <span className="card-title">
                              {post.postedBy.name}
                            </span>
                          </Link>
                        ) : (
                          <span className="card-title">
                            {post.postedBy.name}
                          </span>
                        )}
                        <div className="row">
                          <div className="col m12">
                            <img src={post.photo} alt="img" className="image" />
                          </div>
                          <div className="col s12">
                            <span className="left-align">
                              {post.likes.includes(userId) ? (
                                <i
                                  className="medium material-icons red-text"
                                  onClick={() => {
                                    dispatch(postUnliked(post._id));
                                  }}
                                >
                                  favorite
                                </i>
                              ) : (
                                <i
                                  className="medium material-icons"
                                  onClick={() => {
                                    dispatch(postLiked(post._id));
                                  }}
                                >
                                  favorite
                                </i>
                              )}
                            </span>
                          </div>
                          <div className="col s12">
                            <h5>{post.likes.length} likes</h5>
                          </div>
                          <div className="col s12">
                            <h5>{post.title}</h5>
                          </div>
                          <div className="col s12">
                            <h6>{post.body}</h6>
                          </div>
                          <div className="comment col s12">
                            <div className="row">
                              <form
                                onSubmit={(event) => {
                                  event.preventDefault();
                                  sumbitHandler(
                                    post._id,
                                    event.target[0].value
                                  );
                                  event.target[0].value = "";
                                }}
                              >
                                <div className="col s10">
                                  <input
                                    placeholder="add your comment"
                                    name="text"
                                    type="text"
                                    className="validate"
                                  />
                                </div>
                              </form>
                            </div>
                            {post.comments.map((comment) => {
                              return (
                                <div className="row" key={comment._id}>
                                  <div
                                    className="col s4"
                                    style={{ fontWeight: "bold" }}
                                  >
                                    {comment.postedBy.name}
                                  </div>
                                  <div className="col s8 center-align">
                                    {comment.text}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              })
            ) : (
              <h1 className="center-align">NO POSTS AVAILABLE</h1>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
