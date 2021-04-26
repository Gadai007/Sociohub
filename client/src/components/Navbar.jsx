import React, { Fragment, useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
import { userSignout } from "../store/auth";

const Navbar = (props) => {
  const sideNav = useRef(null);
  const searchModal = useRef(null);

  const token = useSelector((state) => state.entities.auth.token);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [userDetail, setUserDetail] = useState([]);

  useEffect(() => {
    M.Sidenav.init(sideNav.current);
    M.Modal.init(searchModal.current);
  }, []);

  const fetchUser = async (query) => {
    setSearch(query);
    try {
      const response = await axios.post(
        "/api/search-user",
        { query },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserDetail(response.data);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <Fragment>
      <nav className="nav-bar">
        <div className="nav-wrapper">
          <Link to={token ? "/" : "/signin"} className="brand-logo">
            Sociohub
          </Link>
          <Link className="sidenav-trigger">
            <i
              className="material-icons sidenav-trigger"
              data-target="mobile-demo"
            >
              menu
            </i>
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {!token && (
              <React.Fragment>
                <li>
                  <Link to="/signup" className="link">
                    Signup
                  </Link>
                </li>
                <li>
                  <Link to="/signin" className="link">
                    Signin
                  </Link>
                </li>
              </React.Fragment>
            )}
            {token && (
              <React.Fragment>
                <li>
                  <i
                    className="material-icons modal-trigger"
                    data-target="modal1"
                  >
                    search
                  </i>
                </li>
                <li>
                  <Link to="/followingpost" className="link">
                    Following post
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="link">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/createpost" className="link">
                    Create Post
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="link"
                    onClick={() => dispatch(userSignout())}
                  >
                    Signout
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo" ref={sideNav}>
        {!token && (
          <React.Fragment>
            <li>
              <Link to="/signup" className="link">
                Signup
              </Link>
            </li>
            <li>
              <Link to="/signin" className="link">
                Signin
              </Link>
            </li>
          </React.Fragment>
        )}
        {token && (
          <React.Fragment>
            <li>
              <Link className="modal-trigger link" data-target="modal1">
                search
              </Link>
            </li>
            <li>
              <Link to="/followingpost" className="link">
                Following post
              </Link>
            </li>
            <li>
              <Link to="/profile" className="link">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/createpost" className="link">
                Create Post
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="link"
                onClick={() => dispatch(userSignout())}
              >
                Signout
              </Link>
            </li>
          </React.Fragment>
        )}
      </ul>
      <div id="modal1" className="modal" ref={searchModal}>
        <div className="modal-content input-field">
          <input
            placeholder="search user"
            value={search}
            onChange={(event) => fetchUser(event.target.value)}
            type="text"
            className="validate"
          />
        </div>
        <ul class="collection">
          {userDetail.map((user) => {
            return (
              <li key={user._id} className="collection-item">
                <Link to={user._id !== token.user.id ? `/profile/${user._id}`: `/profile`} style={{ color: '#f875aa' }} onClick={() => M.Modal.getInstance(searchModal.current).close()}>{user.email}</Link>
              </li>
            );
          })}
        </ul>
        <div className="modal-footer">
          <button
            className="modal-close waves-effect waves-green btn-flat"
            onClick={() => setSearch("")}
          >
            Agree
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(Navbar);
