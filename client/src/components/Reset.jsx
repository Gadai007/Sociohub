import React, { useState } from "react";
import axios from "axios";
import M from "materialize-css";

const Reset = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/reset-password", { email });
      M.toast({
        html: response.data,
        classes: "#388e3c green darken-2",
      });
    } catch (error) {
      M.toast({
        html: error.response.data.error,
        classes: "#b71c1c red darken-4",
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m6 offset-m3">
          <h2 className="center-align">SOCIOHUB</h2>
          <div className="card">
            <div className="card-content ">
              <span className="card-title">Reset Password </span>
              <form>
                <div className="row">
                  <div className="input-field col m12">
                    <input
                      placeholder="enter your email"
                      name="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      className="validate"
                    />
                    <label htmlFor="email" className="active">
                      <h6>Email</h6>
                    </label>
                  </div>
                  <div className="input-field col m12">
                    <button
                      className="waves-effect waves-light btn #c51162 pink accent-4"
                      onClick={onSubmitHandler}
                    >
                      Reset Password
                    </button>
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

export default Reset;
