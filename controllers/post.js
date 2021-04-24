const { Post } = require("../models/Post");

const getPostById = async (req, res, next, id) => {
  try {
    const post = await Post.findById(id);
    if (post) {
      req.post = post;
      next();
    } else {
      res.status(400).json({ error: "post not found" });
    }
  } catch (error) {
    console.log("error in getPostById", error.message);
  }
};

const createPost = async (req, res) => {
  try {
    const { title, body, photo } = req.body;
    if (!title || !body || !photo) {
      return res.status(400).json({ error: "please type all the fields" });
    }
    req.body.postedBy = req.profile;
    const newPost = new Post(req.body);
    const post = await newPost.save();
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(400).json({ error: "failed o create a post" });
    }
  } catch (error) {
    console.log("error in createPost", error.message);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name")
      .sort("-createdAt");
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(400).json({ errors: "No posts available" });
    }
  } catch (error) {
    console.log("error in getAllPosts controller", error.message);
  }
};

const getAllFollowingPost = async (req, res) => {
  try {
    const post = await Post.find({ postedBy: { $in: req.profile.following } })
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name")
      .sort("-createdAt");
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(400).json({ error: "failed to find following post" });
    }
  } catch (error) {
    console.log("errors in getAllFollowingPost controller", error.message);
  }
};

const getAllUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      postedBy: { _id: req.profile._id },
    }).populate("postedBy", "_id name");
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(400).json("failed to get posts of a particular user");
    }
  } catch (error) {
    console.log("error in getAllUserPosts", error.message);
  }
};

const postLike = async (req, res) => {
  try {
    const likes = await Post.findByIdAndUpdate(
      req.post._id,
      {
        $push: {
          likes: req.profile._id,
        },
      },
      { new: true, useFindAndModify: false }
    );
    if (likes) {
      res.status(200).json(likes);
    } else {
      res.status(400).json({ error: "likes not found" });
    }
  } catch (error) {
    console.log("error in postLike", error.message);
  }
};

const postUnlike = async (req, res) => {
  try {
    const likes = await Post.findByIdAndUpdate(
      req.post._id,
      {
        $pull: {
          likes: req.profile._id,
        },
      },
      { new: true, useFindAndModify: false }
    );
    if (likes) {
      res.status(200).json(likes);
    } else {
      res.status(400).json({ error: "likes not found" });
    }
  } catch (error) {
    console.log("error in postUnlike", error.message);
  }
};

const postComment = async (req, res) => {
  try {
    const comment = {
      text: req.body.text,
      postedBy: req.profile._id,
    };
    const likes = await Post.findByIdAndUpdate(
      req.post._id,
      {
        $push: {
          comments: comment,
        },
      },
      { new: true, useFindAndModify: false }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name");
    if (likes) {
      res.status(200).json(likes);
    } else {
      res.status(400).json({ error: "comments not found" });
    }
  } catch (error) {
    console.log("error in postComment", error.message);
  }
};

const postDelete = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.post._id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(400).json({ error: "failed to delete a post" });
    }
  } catch (error) {
    console.log("error in deleteComment", error.message);
  }
};

module.exports = {
  getPostById,
  createPost,
  getAllPosts,
  getAllUserPosts,
  getAllFollowingPost,
  postLike,
  postUnlike,
  postComment,
  postDelete,
};
