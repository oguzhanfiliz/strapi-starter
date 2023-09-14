// path: ./config/env/production/database.js

const { parse } = require("pg-connection-string").parse;
const config = parse(process.env.DATABASE_URL);

module.exports = ({ env }) => ({
  connection:{
    client : 'postgres',
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: { rejectUnauthorized: false },
    },
  
  }
});
// module.exports = ({ env }) => {
//   const { host, port, database, user, password } = parse(env("DATABASE_URL"));
  
//   return {
//     connection: {
//       client: 'postgres',
//       connection: {
//         host,
//         port,
//         database,
//         user,
//         password,
//         ssl: { rejectUnauthorized: false },
//       },
//       debug: false,
//     },
//   }
// };
