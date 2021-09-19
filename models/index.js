const User = require ('./user');
const Post = require('./post');
const Comment = require('./comment');

//Associations 

//User Associations
User.hasMany(Post,{
    foriegnKey:"userId",
});


User.hasMany(Comment,{
    foriegnKey:"userId",
    onDelete:"Cascade"
});


//Post Associations

Post.belongsTo(User,{
foriegnKey:"userId",
onDelete:"Cascade",
});

Post.hasMany(Comment,{
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

