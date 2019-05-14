import mongoose from 'mongoose';
import config from '../config';
import populate from './populate';

let initialized = false;

export default function init() {
  if (initialized) return null;

  mongoose.connect(config.mongoURL, { useNewUrlParser: true });
  mongoose.set('debug', true);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));

  if (config.populateDB) {
    populate();
  }

  initialized = true;

  return db;
}
