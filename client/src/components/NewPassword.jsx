import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const history = useHistory()
  const { token } = useParams();

  useEffect(() => {
    console.log(token);
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/update-password", { password, token });
      M.toast({
        html: response.data,
        classes: "#388e3c green darken-2",
      });
      history.push('/signin')
    } catch (error) {
      M.toast({
        html: error.response.data.error,
        classes: "#b71c1c red darken-4",
      });
      history.push('/reset')
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m6 offset-m3">
          <h2 className="center-align">SOCIOHUB</h2>
          <div className="card">
            <div className="card-content ">
              <span className="card-title">Change your Password </span>
              <form>
                <div className="row">
                  <div className="input-field col m12">
                    <input
                      placeholder="enter new password"
                      name="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      type="password"
                      className="validate"
                    />
                    <label htmlFor="email" className="active">
                      <h6>Password</h6>
                    </label>
                  </div>
                  <div className="input-field col m12">
                    <button
                      className="waves-effect waves-light btn #c51162 pink accent-4"
                      onClick={onSubmitHandler}
                    >
                      Update Password
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

export default NewPassword;
