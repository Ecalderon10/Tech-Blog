const router = require('express'). Router();
const sequelize = require("../config/connection");
const {Post, User, Comment} = require ('../models');
const withAuthorize = require('../utils/authentication');


router.get('/', withAuthorize, async (req,res) => {
try {
const postInfo = await Post.findAll({
attributes:["id", "title", "content", "created_at"],
include:[{
model: Comment, attributes:["id","comment_text","post_id","user_id","created_at"],
include: {model:User, attributes:["username"]},
},
{model: User,attributes:["username"]}
],
});

const postData = postInfo.map(post => {
    return  post.get({plain: true})
    }
)
console.log({postData})

res.render("dashboard", {posts:postData})

} catch (err){
console.log(err)
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
try {
  const post= await  Post.findOne({where: {
        user_id: req.params.id,
        },
        attributes: ["id", "title", "content", "created_at"],
        include: [{model: Comment,attributes: ["id","comment_text","post_id","user_id","created_at"],include: {model: User,attributes: ["username"]}},
        {model: User,attributes: ["username"]},
        ],
    });
    const postData =  post.get({plain: true})
         
    res.render("edit-post", {post:postData})
    console.log(postData)
    } catch (err) {
    res.status(500).json(err);
    }
});


module.exports = router;

