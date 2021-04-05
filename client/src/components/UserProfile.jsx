import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  userProfileLoad,
  userFollow,
  userUnfollow,
} from "../store/userProfile";

const UserProfile = () => {
  const { profileId } = useParams();
  const dispatch = useDispatch();
  
  const reload = useSelector(state => state.entities.userProfile.reload)

  useEffect(() => {
    dispatch(userProfileLoad(profileId));
  }, [reload]);

  const id = useSelector(state => state.entities.auth.token.user.id)
  const user = useSelector((state) => state.entities.userProfile.user);
  const posts = useSelector((state) => state.entities.userProfile.posts);
  const followers = useSelector(state => state.entities.userProfile.followers)
  const following = useSelector(state => state.entities.userProfile.following)


  return (
    <div className="container profile">
      <div className="row">
        <div className="col m8 offset-m2 s12">
          <div className="row">
            <div className="col m4 s10 offset-s2">
              <img
                src="https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="profile gallery"
                className="profile-photo"
              />
            </div>
            <div className="col m8 s12 ">
              <h2 className="center-align">{user.name}</h2>
              <h3 className="center-align">{user.email}</h3>
              <div className="row center-align">
                <div className="col m4 s4">{posts.length} posts</div>
                <div className="col m4 s4">{followers.length} followers</div>
                <div className="col m4 s4">{following.length} following</div>
              </div>
              <div className="row">
              {followers.includes(id) ? (
                  <button
                    className="col s12 m12 waves-effect waves-light btn #c51162 pink accent-4"
                    onClick={() => dispatch(userUnfollow(profileId))}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="col s12 m12 waves-effect waves-light btn #c51162 pink accent-4"
                    onClick={() => dispatch(userFollow(profileId))}
                  >
                    Follow
                  </button>
                )}
                {/* <button
                    className="col s12 m12 waves-effect waves-light btn #c51162 pink accent-4"
                    onClick={() => dispatch(userFollow(profileId))}
                  >
                    Follow
                  </button> */}
              </div>
            </div>
          </div>
          <div className="row">
            {posts.length !== 0 ? (
              posts.map((post) => {
                return (
                  <Fragment key={post._id}>
                    <div className="col m4 s12 img-container">
                      <img
                        src={post.photo}
                        alt="profile gallery"
                        className="gallery"
                        style={{ border: "2px solid #f875aa" }}
                      />
                    </div>
                  </Fragment>
                );
              })
            ) : (
              <h1 className="center-align">
                {user.name} HAVEN'T POSTED ANYTHING
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
