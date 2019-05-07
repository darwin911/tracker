
const { Sequelize } = require('sequelize');

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgresql',
    operatorAliases: false,
    define: {
      underscored: true,
    },
  });
} else {
  sequelize = new Sequelize({
    database: 'tracker',
    dialect: 'postgresql',
    operatorAliases: false,
    define: {
      underscored: true,
    }
  });
}

const User = sequelize.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isEmail: true }
  },
  password_digest: {
    type: Sequelize.STRING,
  },
  picture: {
    type: Sequelize.STRING,
    defaultValue: "https://pngimage.net/wp-content/uploads/2018/05/default-profile-pic-png-8.png"
  }
});

const Day = sequelize.define('days', {
  date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mood: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  picture: {
    type: Sequelize.STRING,
  }
});

User.hasMany(Day, {
  onDelete: 'cascade',
})

Day.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});

module.exports = {
  sequelize,
  User,
  Day
}