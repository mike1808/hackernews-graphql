import dotenv from 'dotenv';

dotenv.config();

const env = process.env;

const config = {
  port: +env.PORT || 4000,
  mongoURL: env.MONGO_URL,
  populateDB: Boolean(env.HN_POPULATE),
};

export default config;
