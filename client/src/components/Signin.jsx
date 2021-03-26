import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import M from "materialize-css";
import { Link, Redirect } from "react-router-dom";
import { userSignIn } from "../store/auth";


const Signin = (props) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });


  const error = useSelector((state) => state.entities.auth.error);
  const redirect = useSelector(state=> state.entities.auth.redirect)
  const token = useSelector(state=> state.entities.auth.token)

  useEffect(() => {
    if (error !== "") {
      M.toast({ html: error, classes: "#b71c1c red darken-4" });
    }
  }, [error]);

  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(userSignIn(values));
  };

  const reload = () => {
    if(token){
      return <Redirect to='/profile' />
    }else{
      <Redirect to='/' />
    }
  }
  useEffect(() => {
    console.log(redirect)
    if(redirect){
      window.location.assign('/profile')
    }
  }, [redirect])

  
  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m6 offset-m3">
          <h2 className="center-align">Sign In</h2>
          <div className="card">
            <div className="card-content ">
              <span className="card-title">Welcome to sociohub ❤</span>
              <form>
                <div className="row">
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
                  <div className="input-field col m12">
                    <button
                      className="waves-effect waves-light btn #c51162 pink accent-4"
                      onClick={onSubmitHandler}
                    >
                      Signin
                    </button>
                  </div>
                </div>
              </form>
              <Link className="grey-text text-darken-2" to="/signup">
                Don't have an account ?
              </Link>
            </div>
          </div>
        </div>
      </div>
      {reload()}
    </div>
  );
};

export default Signin;
