const {Model, DataTypes} = require("sequelize");
const sequelize = require('../config/connection');


class Comment extends Model {}


Comment.init({
    id:{
type: DataTypes.INTEGER,
primaryKey:true,
autoIncrement:true,
},

comment:{
type:DataTypes.STRING,
validate:{
len:[3],
}
},

userId:{
type: DataTypes.INTEGER,
allowNull:false,
references:{
    model:"post",
    key:"id"
}
},

postId:{
type:DataTypes.INTEGER,
allowNull: false,
references:{
model:"post",
key:"id"
}
}
},

{
sequelize,
freezeTableName:true,
underscored: true,
modelName:"comment",
}
)

module.exports = Comment;