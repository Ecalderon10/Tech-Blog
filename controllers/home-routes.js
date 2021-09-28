const router = require("express").Router();
const {User, Post, Comment} = require('../models');


router.get('/', async (req,res) => {
    try{
    const postData = await Post.findAll({attributes:["id","title","content","created_at"], include:[{model:Comment, attributes:["id","comment_text","post_id","user_id","created_at"],
    include:{model:User, attributes:["username"]},
    },
    {
    model:User, attributes:['username'],
    },
    ],
    });

    const blogPost = postData.map((post) => post.get({ plain: true}));
    res.render("home-page", {
    blogPost,
    loggedIn: req.session.loggedIn,
    });
    }
    catch(err){
    res.status(500).json(err)
    } 
});


router.get('/login', async (req,res) => {
// console.log(req.session.loggedIn)
res.render('login');
});

router.get('/signup', (req,res) => {
 res.render("sign-up");
});

//get post by id

router.get("/post/:id", async (req,res) => {
const post_idData =await Post.findOne({where: {id:req.params.id},
attributes: ["id", "content", "title","created_at"],
include:[{model: Comment, attributes:["id", "comment_text", "post_id", "user_id","create"],
include: {
    model:User,
    attributes:["username"],
},
},
{
    model:User,
    attributes:['username'],
},
],
});
if(!post_idData) {
    res.status(404).json({message:"No post found with this id"});
    return;
}
const postId = postIdData.get({ plain:true});
console.log(post);
res.render("post", { post, loggedIn: req.session.loggedIn});
});

//comments

router.get('/post-comment',async (req,res) => {
    const commentsData = await Post.findOne({
    where: {
        id:req.params.id,
    },
    attributes: ["id", "content", "title", "created_at"],
    include:[{model: Comment, attributes:["id","comment_text","post_id", "user_id", "created_at"],
model:User,
attributes:["username"],
},
],
});
if(!commentsData) {
    res.status(404).json({message: "No post found with this id"});
    return;
}
const comments = commentsData.get({plain:true});
console.log(post);
res.render("comments", { comments, loggedIn: req.session.loggedIn});
});

module.exports = router;

