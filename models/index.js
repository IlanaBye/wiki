const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wiki", {
  logging: false,
});

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("open", "closed"),
  },
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true,
    allowNull: false,
  },
});

module.exports = {
  db,
  Page,
  User,
};

// db.authenticate()
//   .then(() => {
//     console.log('connected to the database');
//   })
