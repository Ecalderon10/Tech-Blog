const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuthorize = require("../../utils/authentication");

router.get("/", async (req, res) => {
  const dbPostData = await Post.findAll({
    attributes: ["id", "title", "content", "created_at"],
    order: [["created_at", "DESC"]],
    include: [
      { model: User, attributes: ["username"] },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  });
  res.json(dbPostData);
});

router.get("/:id", (req, res) => {
  Post.findOneandUpdate({
    where: { id: req.params.id },
    attributes: ["id", "content", "title", "created_at"],
    include: [
      { model: User, attributes: ["username"] },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: { model: User, attributes: ["username"] },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuthorize, (req, res) => {
  // console.log(req.body);
  Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuthorize, (req, res) => {
  console.log(req.body);
  Post.update(
    {
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    },
    {
      where: { id: req.params.id },
    }
  ).then((dbPostData) => {
    // console.log(dbPostData);
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });

      return;
    }
    res.json(dbPostData);
  });
  // .catch((err) => {
  //   console.log(err);
  //   res.status(500).json(err);
  // });
});

router.delete("/:id", withAuthorize, (req, res) => {
  Post.destroy({ where: { id: req.params.id } })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post was found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
