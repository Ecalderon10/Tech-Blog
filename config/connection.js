const sequelize = require('sequelize');
const dotenv = require('dotenv').config();

let sequelize;

if(process.env.JAWSDB_URL) {
sequelize = new sequelize(process.env.JAWSDB_URL)
} else {
sequelize = new sequelize(
process.env.Db_NAME,
process.env.DB_USER,
process.env.DB_PASSWORD,
{
    host:"localhost",
    dialect:"mysql",
    PORT: 3306,
}
);
}

module.exports = sequelize;