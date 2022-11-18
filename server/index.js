const express = require("express");
const {Pool} = require('pg');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const { urlencoded } = require("body-parser");
const PORT = process.env.PORT || 3001;



// Create express app
const app = express();
// const port = 3000;
// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

// Add process hook to shutdown pool
process.on('SIGINT', function() {
  pool.end();
  console.log('Application successfully shutdown');
  process.exit(0);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/login", (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http:localhost:3000' )
  console.log("hello");
  res.send({ message: "Hello fdfja server!" });
});

// allows for parsing of request body 
app.use(express.json())

// handle post for login
app.post("/login", (req, res) => {
  const val = req.body.title
  console.log(req.body.title)
    pool
      .query("Select ismanager From employees where id = " + val)
      .then(query_res => {
          for (let i = 0; i < query_res.rowCount; i++) {
              console.log(query_res.rows[i]);
              if (query_res.rows[i].ismanager === true) {
                console.log('good')
                res.send(query_res.rows[i])
              }

              else {
                console.log('bad')
                res.send(query_res.rows[i])
              }
          }
      });
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
   
//Comment for wayland me

//fjdioapfdiajdf 


// test for riley
