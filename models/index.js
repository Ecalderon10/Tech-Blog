const User = require ('./user');
const Post = require('./post');
const Comment = require('./comment');

//Associations 

//User Associations
User.hasmany(Post,{
    foriegnKey:"userId",
});


User.hasmany(Comment,{
    foriegnKey:"userId",
    onDelete:"Cascade"
});


//Post Associations

Post.belongsTo(User,{
foriegnKey:"userId",
onDelete:"Cascade",
});

Post.hasmany(Comment,{
    foriegnKey:"postId",
    onDelete:"Cascade"
});

// Comment Associations

Comment.belongsTo(User,{
    foriegnKey:"userId",
    onDelete:"CASCADE",
});

Comment.belongsTo(Post,{
foriegnKey:"postId",
onDelete:"Cascade"
});


module.exports = {User, Post, Comment};

