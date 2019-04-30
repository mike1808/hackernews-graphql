require('dotenv').config();

const env = process.env;

module.exports = {
  port: +env.PORT || 4000,
  mongoURL: env.MONGO_URL,
  populateDB: Boolean(env.HN_POPULATE),
};
