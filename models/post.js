const {Model, DataTypes} = require("sequelize");
const sequelize = require('../config/connection');


class Post extends Model {}


Comment.init({
    id:{
type: DataTypes.INTEGER,
primaryKey:true,
autoIncrement:true,
},

title:{
type: DataTypes.INTEGER,
allowNull:false,
},

content:{
    type:DataTypes.TEXT,
    allowNull:false,
},

userId:{
type: DataTypes.INTEGER,
allowNull:false,
references:{
    model:"user",
    key:"id"
}
},
},

{
sequelize,
freezeTableName:true,
underscored: true,
modelName:"post",
}
)

module.exports = Post;