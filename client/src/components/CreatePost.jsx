import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import M from 'materialize-css'
import { postAdd } from "../store/posts";


const CreatePost = (props) => {
  const [post, setPost] = useState({
    title: "",
    body: "",
    photo: "",
  });

  const name = useSelector((state) => state.entities.auth.token.user.name);
  const loading = useSelector((state) => state.entities.posts.loading);
  const responsePost = useSelector((state) => state.entities.posts.post.title);
  const error = useSelector((state) => state.entities.posts.error);


  useEffect(() => {
    if(responsePost){
     return M.toast({ html: `"${responsePost}" added `, classes: '#388e3c green darken-2'})
    }
  }, [responsePost])

  useEffect(() => {
    if(error){
      return M.toast({ html:  error, classes: '#b71c1c red darken-4'})
    }
  }, [error])

  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    let value = "";
    if (event.target.name === "photo") {
      value = event.target.files[0];
    } else {
      value = event.target.value;
    }
    setPost({ ...post, [event.target.name]: value });
  };

  const onSubmitHandler =async (event) => {
    event.preventDefault();
    if(post.photo === '' || post.title === '' || post.body === ''){
      return M.toast({ html: 'please complete all fields', classes: '#b71c1c red darken-4'})
    }
    const data = new FormData();
    data.append("file", post.photo);
    data.append("upload_preset", "sociohub");
    data.append("cloud_name", "gadai007");
    const response = await axios.post("https://api.cloudinary.com/v1_1/gadai007/image/upload", data)
    const newPost = {
      title: post.title,
      body: post.body,
      photo: response.data.url
    }
    dispatch(postAdd(newPost))
    setPost({
      title: '',
      body: '',
      photo: ''
    })
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m6 offset-m3">
          <h2 className="center-align">Hello {name}</h2>
          <div className="card">
            <div className="card-content ">
              <span className="card-title">Create your post ❤</span>
              <form>
                <div className="row">
                  <div className="input-field col m12">
                    <input
                      placeholder="give a title to your post"
                      name="title"
                      value={post.title}
                      onChange={onChangeHandler}
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="email" className="active">
                      <h6>Title</h6>
                    </label>
                  </div>
                  <div className="input-field col m12">
                    <input
                      placeholder="give a body for your post"
                      name="body"
                      value={post.body}
                      onChange={onChangeHandler}
                      type="text"
                      className="validate mt-4"
                    />
                    <label htmlFor="password" className="active">
                      <h6>Body</h6>
                    </label>
                  </div>
                  <div className="file-field input-field col m12">
                    <div className="waves-effect waves-light btn #c51162 pink accent-4">
                      <span>File</span>
                      <input
                        type="file"
                        accept="image"
                        name="photo"
                        onChange={onChangeHandler}
                      />
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" />
                    </div>
                  </div>
                  <div className="input-field col m12">
                    <div className="row">
                      <div className="col s6">
                        <button
                          className="waves-effect waves-light btn #c51162 pink accent-4"
                          onClick={onSubmitHandler}
                        >
                          Create Post
                        </button>
                      </div>
                      <div className="col s6">
                        {loading && (
                          <div className="preloader-wrapper small active">
                            <div className="spinner-layer spinner-red-only">
                              <div className="circle-clipper left">
                                <div className="circle"></div>
                              </div>
                              <div className="gap-patch">
                                <div className="circle"></div>
                              </div>
                              <div className="circle-clipper right">
                                <div className="circle"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
