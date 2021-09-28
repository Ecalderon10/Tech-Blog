const User = require ('./user');
const Post = require('./post');
const Comment = require('./comment');

//Associations 

//User Associations
//redunt with line 27
// User.hasMany(Post,{
//     foriegnKey:"user_id",
// });

//redudent to line 22
// User.hasMany(Comment,{
//     foriegnKey:"user_id",
//     onDelete:"Cascade"
// });


//Post Associations

Post.belongsTo(User,{
foriegnKey:"user_id",
onDelete:"Cascade",
});

Post.hasMany(Comment,{
    foriegnKey:"post_id",
    onDelete:"Cascade"
});

// Comment Associations

Comment.belongsTo(User,{
    foriegnKey:"user_id",
    onDelete:"CASCADE",
});



module.exports = {User, Post, Comment};

