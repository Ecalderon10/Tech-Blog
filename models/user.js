const {Model, DataTypes} = require("sequelize");
const sequelize = require('../config/connection');


class User extends Model { 
// checkPassword(passwordData){

// }

}


User.init({
id:{
type: DataTypes.INTEGER,
primaryKey:true,
autoIncrement:true,
},

username:{
type: DataTypes.STRING,
allowNull: false,
},
password:{
type:DataTypes.STRING,
allowNull:false,
validate:{
len:[6],
}
}
},

{
sequelize,
freezeTableName:true,
underscored: true,
modelName:"user",
}
)

module.exports = User;
