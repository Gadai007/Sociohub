import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
import { userSignUp } from "../store/auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    pic: "",
  });

  const error = useSelector((state) => state.entities.auth.error);
  const token = useSelector((state) => state.entities.auth.token);
  const name = useSelector((state) => state.entities.auth.user.name);

  useEffect(() => {
    if (error !== "") {
      M.toast({ html: error, classes: "#b71c1c red darken-4" });
    }
  }, [error]);

  useEffect(() => {
    if (name) {
      M.toast({
        html: `${name} please signin`,
        classes: "#388e3c green darken-2",
      });
    }
  }, [name]);

  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    let value = "";
    if (event.target.name === "pic") {
      value = event.target.files[0];
    } else {
      value = event.target.value;
    }

    setValues({ ...values, [event.target.name]: value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if(values.pic === ''){
      return M.toast({ html: 'upload an image', classes: '#b71c1c red darken-4'})
    }
    const data = new FormData();
    data.append("file", values.pic);
    data.append("upload_preset", "sociohub");
    data.append("cloud_name", "gadai007");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/gadai007/image/upload",
      data
    );
    const newValues = {
      name: values.name,
      email: values.email,
      password: values.password,
      pic: response.data.url,
    };
    dispatch(userSignUp(newValues));
    setValues({
      name: "",
      email: "",
      password: "",
      pic: "",
    });
  };

  const reload = () => {
    if (token) {
      return <Redirect to="/profile" />;
    } else {
      <Redirect to="/" />;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m6 offset-m3">
          <h2 className="center-align">Sign Up</h2>
          <div className="card">
            <div className="card-content ">
              <span className="card-title">Welcome to sociohub ❤</span>
              <form>
                <div className="row signup">
                  <div className="input-field col m12">
                    <input
                      placeholder="enter your name"
                      name="name"
                      value={values.name}
                      onChange={onChangeHandler}
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="name" className="active">
                      <h6>First Name</h6>
                    </label>
                  </div>
                  <div className="input-field col m12">
                    <input
                      placeholder="enter your email"
                      name="email"
                      value={values.email}
                      onChange={onChangeHandler}
                      type="email"
                      className="validate"
                    />
                    <label htmlFor="email" className="active">
                      <h6>Email</h6>
                    </label>
                  </div>
                  <div className="input-field col m12">
                    <input
                      placeholder="enter your password"
                      name="password"
                      value={values.password}
                      onChange={onChangeHandler}
                      type="password"
                      className="validate mt-4"
                    />
                    <label htmlFor="password" className="active">
                      <h6>Password</h6>
                    </label>
                  </div>
                  <div className="file-field input-field col m12">
                    <div className="waves-effect waves-light btn #c51162 pink accent-4">
                      <span>File</span>
                      <input
                        type="file"
                        accept="image"
                        name="pic"
                        onChange={onChangeHandler}
                      />
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" />
                    </div>
                  </div>
                  <div className="input-field col m12">
                    <button
                      className="waves-effect waves-light btn #c51162 pink accent-4"
                      onClick={onSubmitHandler}
                    >
                      Signup
                    </button>
                  </div>
                </div>
              </form>
              <Link className="grey-text text-darken-2" to="/signin">
                Already have an account ?
              </Link>
            </div>
          </div>
        </div>
      </div>
      {reload()}
    </div>
  );
};

export default Signup;
