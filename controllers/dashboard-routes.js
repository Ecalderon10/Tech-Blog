const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuthorize = require("../utils/authentication");

router.get("/", withAuthorize, async (req, res) => {
  try {
    const postInfo = await Post.findAll({
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: { model: User, attributes: ["username"] },
        },
        { model: User, attributes: ["username"] },
      ],
    });

    const postData = postInfo.map((post) => {
      return post.get({ plain: true });
    });
    // console.log({ postData });

    res.render("dashboard", { posts: postData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
});

// router.get("/new", (req, res) => {
//     res.render("single");
// });

router.get("/edit/:id", withAuthorize, async (req, res) => {
  // try {
  console.log(req.params.id);
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "createdAt"],
    include: [
      { model: User, attributes: ["username"] },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id"],
        include: { model: User, attributes: ["username"] },
      },
    ],
  }).then((dbPostData) => {
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this Id" });
    }

    const post = dbPostData.get({ plain: true });

    res.render("edit-post", { post, loggedIn: true });
    console.log(post);

    // } catch (err) {
    // res.status(500).json(err);
    // }
  });
});

module.exports = router;
