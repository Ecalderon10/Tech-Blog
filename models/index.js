const User = require ('./user');
const Post = require('./post');
const Comment = require('./comment');

//Associations 

//User Associations
//redunt with line 27
// User.hasMany(Post,{
//     foriegnKey:"userId",
// });

//redudent to line 22
// User.hasMany(Comment,{
//     foriegnKey:"userId",
//     onDelete:"Cascade"
// });


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



module.exports = {User, Post, Comment};

