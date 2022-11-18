// const {Pool} = require('pg');

// const pool = new Pool({
//   user: process.env.REACT_APP_PSQL_USER,
//   host: process.env.REACT_APP_PSQL_HOST,
//   database: process.env.REACT_APP_PSQL_DATABASE,
//   password: process.env.REACT_APP_PSQL_PASSWORD,
//   port: process.env.REACT_APP_PSQL_PORT,
//   ssl: {rejectUnauthorized: false}
// });

// process.on('SIGINT', function() {
//   pool.end();
//   console.log('Application successfully shutdown');
//   process.exit(0);
// });

// handleLogin('/login', (req, res) => {
//   val = document.getElementById("loginVal").ariaValueMax;
//   Pool
//       .query("Select ismanager From employees where id = " + val)
//       .then(query_res => {
//           for (let i = 0; i < query_res.rowCount; i++) {
//               console.log(query_res.rows[i]);
//           }
//       });
// });