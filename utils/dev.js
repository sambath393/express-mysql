const dotenv = require('dotenv');
dotenv.config();

const debug = () => process.env.NODE_ENV === 'development';

const CONFIG = () => {
  const mode = {
    development: {
      host: '127.0.0.1',
      port: 3306,
      user: 'test',
      password: 'Test007?',
      database: 'test',
    },
    production: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
  };

  return {
    client: 'mysql',
    connection: debug() ? mode.development : mode.production,
    pool: { min: 0, max: 7 },
  };
};

module.exports = {
  debug,
  CONFIG,
};
