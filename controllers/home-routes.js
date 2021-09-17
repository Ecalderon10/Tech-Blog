const router = require("express").Router();
const {User, Post, Comment} = require('../models');


router.get('/', async (req,res) => {
    try{
    const postData = await Post.findAll({attributes:["id","title","content","created_at"], include:[{model:Comment, attributes:["id","comment","postId","userId","created_at"],
    include:{model:User, attributes:["username"]},
    },
    {
    model:User, attributes:['username'],
    },
    ],
    });

    const blogPost = postData.map((post) => post.get({ plain: true}));
    res.render("homepage", {
    blogPost,
    loggedIn: req.session.loggedIn,
    });
    }
    catch(err){
    res.status(500).json(err)
    } 
});


router.get('/login', async (req,res) => {
if(req.session.loggedIn){
res.redirect('/');
return;
}
res.render('login');
});

router.get('/signup', (req,res) => {
 res.render("sign-up");
});



