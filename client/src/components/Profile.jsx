import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { myPostsLoad, postDelete } from "../store/posts";

const Profile = () => {
  const name = useSelector((state) => state.entities.auth.token.user.name);
  const posts = useSelector((state) => state.entities.posts.myPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myPostsLoad());
  }, []);


  return (
    <div className="container profile">
      <div className="row">
        <div className="col m8 offset-m2 s12">
          <div className="row">
            <div className="col m4 s12 offset-s2">
              <img
                src="https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="profile gallery"
                className="profile-photo"
              />
            </div>
            <div className="col m8 s12">
              <h2 className="center-align">{name}</h2>
              <div className="row center-align">
                <div className="col m4 s4">60 posts</div>
                <div className="col m4 s4">100 followers</div>
                <div className="col m4 s4">12 following</div>
              </div>
            </div>
          </div>
          <div className="row">
            {posts.length !== 0 ? (
              posts.map((post) => {
                return (
                  <Fragment key={post._id} >
                    <div className="col m4 s12 offset-s2 img-container" >
                      <img
                        src={post.photo}
                        alt="profile gallery"
                        className="gallery"
                        style={{border: '2px solid #f875aa'}}
                      />
                      <i className="small material-icons img-icon" onClick={() => dispatch(postDelete(post._id))}>delete</i>
                    </div>
                  </Fragment>
                );
              })
            ) : (
              <h1 className="center-align">YOU HAVEN'T POSTED ANYTHING</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
