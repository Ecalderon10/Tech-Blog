const { User } = require("../models");

const userData = [
  {
    username: "Eddy",
    password: "password",
  },
  {
    username: "Berkeley",
    password: "Ilovebones",
  },
  {
    username: "Winston",
    password: "Ilovemykong",
  },
];

const seedUsers = async () => await User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});;

module.exports = seedUsers;