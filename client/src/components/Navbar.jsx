import React, { Fragment, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import M from "materialize-css";
import { userSignout } from "../store/auth";

const Navbar = (props) => {
  const sideNav = useRef(null);

  const token = useSelector((state) => state.entities.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    M.Sidenav.init(sideNav.current);
  }, []);

  return (
    <Fragment>
      <nav className="nav-bar">
        <div className="nav-wrapper">
          <Link to={token ? '/': '/signin'} className="brand-logo">
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
    </Fragment>
  );
};

export default withRouter(Navbar);
