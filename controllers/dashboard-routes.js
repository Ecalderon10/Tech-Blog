const router = require('express'). Router();
const sequelize = require("../config/connection");
const {Post, User, Comment} = require ('../models');
const withAuthorize = require('../utils/authentication');


router.get('/', withAuthorize, async (req,res) => {
try {
const postinfo = await Post.findAll({where:{userId:req.session.userId},
attributes:["id", "title", "content", "created_at"],
include:[{
model: Comment, attributes:["id","comment","postId","userId","created_at"],
include: {model:User, attributes:["username"]},
},
{model: User,attributes:["username"]}
],
});
} catch (err){
res.status(500).json(err);
}
});

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
    res.redirect("/");
    return;
    }
    res.render("login");
});


router.get("/new", (req, res) => {
    res.render("new-post");
});


router.get("/edit/:id", withAuthorize, async (req, res) => {
try {
    Post.findOne({where: {
        user_id: req.params.id,
        },
        attributes: ["id", "title", "content", "created_at"],
        include: [{model: Comment,attributes: ["id","comment","postId","userId","created_at",],include: {model: User,attributes: ["username"]}},
        {model: User,attributes: ["username"]},
        ],
    });
    } catch (err) {
    res.status(500).json(err);
    }
});


module.exports = router;

