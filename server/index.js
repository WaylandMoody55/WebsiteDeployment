const express = require("express");
const {Pool} = require('pg');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const { urlencoded } = require("body-parser");
const PORT = process.env.PORT || 3001;
const cors = require('cors')



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
app.use(cors({
    origin: 'https://testlaunch.onrender.com'
}));
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/login", (req, res) => {
  res.set('Access-Control-Allow-Origin', 'https://testlaunch.onrender.com/' )
  console.log("hello");
  res.send({ message: "Hello fdfja server!" });
});

app.get("/ServerSide", (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http:localhost:3000' )
  console.log("serverSide get requested");
  pool
    .query("SELECT MAX(ordernumber) FROM orders")
    .then(query_res => {
      for (let i = 0; i < query_res.rowCount; i++) {
          console.log(query_res.rows[i]);
          res.send(query_res.rows[i]);
      }
  });
});

// allows for parsing of request body 
app.use(express.json())

// handle post for login
app.post("/login", (req, res) => {
  const val = req.body.title
  console.log(req.body.title)
    res.set('Access-Control-Allow-Origin', 'https://testlaunch.onrender.com/' )
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

app.post("/menuTable", (req,res) => {
  pool 
    .query("SELECT * FROM foodbev")
    .then(query_res => {
      res.send(query_res.rows);
    });
})

app.post("/updatePrice", (req,res)=>{
  const name = req.body.name
  const price = req.body.price
  console.log(req.body.name)
  console.log(req.body.price)
  // String sqlStatement = "UPDATE foodbev SET price = "+newPrice+" WHERE name = "+"'"+itemName+"'";
    pool
      .query("UPDATE foodbev SET price = " + price + " WHERE name = '"+name+"'")
})


app.post("/newMenuItem",(req,res) =>{
  const name = req.body.name
  const price = req.body.price
  console.log(req.body.name)
  console.log(req.body.price)
  //String sqlStatement = "INSERT INTO foodbev (name, price) VALUES ('" + itemName + "', " + newPrice + ")";
    pool
      .query("INSERT INTO foodbev (name, price) VALUES ('"+ name+ "', " + price + ")")
})

app.post("/addSeasonal",(req,res)=>{
  const name = req.body.name
  const price = req.body.price
  console.log(req.body.name)
  console.log(req.body.price)
  //String sqlStatement = "INSERT INTO foodbev (name, price) VALUES ('s*" + itemName + "', " + newPrice + ")";
    pool
      .query("INSERT INTO foodbev (name, price) VALUES ('s*" + name + "', " + price + ")")
})

app.post("/removeSeasonal", (req,res) => {
  const name = req.body.name
  console.log(req.body.name)
  //String sqlStatement = "DELETE FROM foodbev WHERE name = 's*" + itemName + "'";
    pool
      .query("DELETE FROM foodbev WHERE name = 's*" + name + "'")
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


//gbjksdbgjkfdshgjkbdsjkgsdklsgsd
//fbjakbfjkasbjkfbajksbfkj


//Comment for wayland me

//fjdioapfdiajdf 


// test for riley
// test for riley2
