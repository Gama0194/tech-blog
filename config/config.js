import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

function initialize(passport) {
  const authenticateUser = async (username, password, done) => {
    const user = await User.findOne({ where: { username: username } });

    if (user == null) {
      return done(null, false, { message: 'No user with that username' });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    return done(null, user);
  });
}

module.exports = { sequelize, initialize };
