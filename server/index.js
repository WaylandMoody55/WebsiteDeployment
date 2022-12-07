const express = require("express");
const {Pool} = require('pg');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const { urlencoded } = require("body-parser");
const PORT = process.env.PORT || 3001;
const cors = require('cors');
// const { default: PairSales } = require("../client/src/components/PairSales");


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

// I think there is sometimes a delay when entering new order into database which could cause issues when 
// fetching the ordernumber in the future 
app.get("/orderNumber", (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http:localhost:3000' )
  console.log("orderNumber get requested");
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

app.post("/pairSales", (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http:localhost:3000' )
  var nameArray = new Array()
  var rowDat = new Array()
  var minOrder = 0
  var maxOrder = 0
  var initialDate = req.body.initial
  var endingDate = req.body.ending
  console.log(initialDate)
  console.log(endingDate)

  // get min and max ordernumbers based on dates
    getOrderNumbers = () => {
     return new Promise((resolve, reject) => { // promising allows you to wait for request to finish before you move on next part of code
      pool
        .query("SELECT MIN(ordernumber), MAX(ordernumber) FROM orders WHERE date = '" + initialDate + "' OR date = '" + endingDate + "'",  (error, results) => {
          if (error) return reject (error);
          else {
          return resolve(results)
        }
      })
    })
  }


 
  // grab names from foodbev
   getNames = () => {
    return new Promise((resolve, reject) => {
  pool
    .query("SELECT name FROM foodbev", (error, results) => {
      if (error) return reject(error);
      else {
        return resolve(results)
      }
    })
  })
}

      // Get item from the orders from min order to max order 
      pairInfo = (i) => {
        return new Promise((resolve, reject) => {
      pool
        .query("SELECT item FROM orders_pair_table WHERE ordernumber = " + (i + 1), (error, results) => {
          if (error) return reject(error)
          else {
            return resolve(results)
          }
      })
    })
  }
  // how the code is run in sequential order 
  async function sequentialQueries() {
    try {
     const result1 = await getOrderNumbers()
     minOrder = result1.rows[0].min
     maxOrder = result1.rows[0].max
     const result2 = await getNames()
    for (let i = 0; i < result2.rowCount; i++) {
      nameArray.push(result2.rows[i].name);
    }
    var countArray = new Array(nameArray.length)
    for (var i = 0; i < countArray.length; i++) {
      countArray[i] = new Array(nameArray.length)
      for (var j = 0; j < nameArray.length; j++) {
        countArray[i][j] = 0
      }
    }
    for (var i = minOrder; i < maxOrder + 1; i++) {
      var subArray = new Array()
      const result3 = await pairInfo(i)
      for (var l = 0; l < result3.rowCount; l++) {
        if (subArray.includes(result3.rows[l].item) === false) {
          subArray.push(result3.rows[l].item)
        }
      }

      // add pairing into 2d array [j][f] and [f][j]
      for (var j = 0; j < subArray.length; j++) {
        for (var f = j + 1; f < subArray.length; f++) {
          var index1 = nameArray.indexOf(subArray[j])
          var index2 = nameArray.indexOf(subArray[f])
          countArray[index1][index2] = countArray[index1][index2] + 1;
        }
      }
    }
      var iMenuItem = 0
      var jMenuItem = 0

      var pairCount = 1

      while (pairCount < 5) {
        var max = 0

        for (var i = 0; i < countArray.length; i++) {
          for (var j = i + 1; j < countArray.length; j++) {
            if (countArray[i][j] + countArray[j][i] > max) {
              max = countArray[i][j] + countArray[j][i]
              iMenuItem = i
              jMenuItem = j
            }
          }
        }

        if (nameArray[iMenuItem] === "comboCharge" || nameArray[jMenuItem] === "comboCharge") {
          countArray[iMenuItem][jMenuItem] = 0
          countArray[jMenuItem][iMenuItem] = 0
          continue
        }

        rowDat.push({ item1: nameArray[iMenuItem], item2: nameArray[jMenuItem], amount: max })

        countArray[iMenuItem][jMenuItem] = 0
        countArray[jMenuItem][iMenuItem] = 0
        pairCount += 1
      }
      console.log(rowDat)
      res.send(rowDat)
  }
  catch(error) {
    console.log(error)
  }
  }
  sequentialQueries()
})

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



app.post("/oauthLogin", (req,res) =>{
  const loginName = req.body.firstName
  console.log(req.body.firstName);

  pool  
    .query("Select ismanager From employees where firstname = " + "'" + loginName + "'")
    .then(query_res => {
      console.log(query_res.rows[0]);
      res.send(query_res.rows[0]);
    })


})


app.post("/ingredientTable", (req,res) => {
  pool
    .query("SELECT * FROM ingredients")
    .then(query_res => {
      res.send(query_res.rows);
    })
})

app.post("/salesReport", (req, res) => {
  const fDate = req.body.fDate
  const tDate = req.body.tDate
  pool
    .query( "SELECT foodbev.name, COUNT(*) FROM foodbev INNER JOIN orders_pair_table ON orders_pair_table.item = foodbev.name WHERE date BETWEEN '"+fDate+"' AND '"+tDate+"' GROUP BY name ORDER BY count DESC")
    .then(query_res => {
      res.send(query_res.rows);
    });

})

app.post("/editInventory", (req,res) =>{
  const name = req.body.name
  const quantity = req.body.amount
  pool
    //String sqlstatement1 = "UPDATE ingredients SET quantity = " + inventory_quantity + " WHERE name = '" + inventory_name + "'";
    .query("UPDATE ingredients SET quantity = " + quantity + " WHERE name = '" + name + "'")
})

app.post("/newIngredient", (req,res) =>{
  const name = req.body.name
  const quantity = req.body.amount
  const price = req.body.price
  const units = req.body.units
  const storage = req.body.storage
  pool
    //String sqlStatement = "INSERT INTO ingredients VALUES ('" + itemName + "', " + quantity + "," + individualPrice + ", '" + units + "', '" + storage + "')";
    .query("INSERT INTO ingredients VALUES ('" + name + "' ," + quantity + "," + price + ", '" + units + "' , '" + storage + "')")
})


//THIS COrrectly returns the max restock ID

app.post("/restockID", (req,res) => {
  const item = req.body.name
  const vendor = req.body.vendor
  const quantity = req.body.quantity
  //var id = 0
  pool
    .query("SELECT MAX(restockid) FROM restock")
    .then(query_res => {
      //console.log(query_res.rows[0].max);
      //id = query_res.rows[0].max;
      pool
        //String sqlStatement = "INSERT INTO restock VALUES ("+restock_id+",'10/12/2022','"+item+"','"+vendor+"',"+amnt+")";
        .query("INSERT INTO restock VALUES (" + parseInt(parseInt(query_res.rows[0].max) + 1) + ",'11/21/2022','" + item + "','" + vendor + "'," + quantity + ")")
    })

})



app.post("/updateRestock", (req,res) =>{
  const item = req.body.name
  const q = req.body.quantity
  console.log(item)
  console.log(q)
  //String sqlStatement = "SELECT quantity FROM ingredients WHERE name = '" + item+"'";
  
  pool 
    .query("SELECT quantity FROM ingredients WHERE name = '" + item + "'")
    .then(query_res => {
      console.log(query_res.rows[0].quantity)
      pool
      //sqlStatement = "UPDATE ingredients SET quantity = " + new_quantity + " WHERE name = '" + item+"'";
        .query("UPDATE ingredients SET quantity = " + parseInt(parseInt(q) + parseInt(query_res.rows[0].quantity)) + "WHERE name = '" + item + "'")
    })

    
})


app.post("/restockTable", (req,res) => {
  pool
    .query("SELECT * FROM restock")
    .then(query_res => {
      res.send(query_res.rows);
    });
})

app.post("/menuTable", (req,res) => {
  pool 
    .query("SELECT * FROM foodbev")
    .then(query_res => {
      res.send(query_res.rows);
    });
})

app.post("/orderHistory", (req,res) => {
  pool 
    .query("SELECT * FROM orders")
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
      .query("INSERT INTO foodbev (name, price) VALUES ('n*"+ name+ "', " + price + ")")
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

// get employee name from sql
app.post("/getEmployeeName", (req,res) => {
  const id = req.body.employeeID;
  pool
      .query("SELECT firstname, lastname FROM employees WHERE id = " + id)
      .then(query_res => {
        res.send(query_res.rows[0]);
      });
})
app.get("/getMenuItemPrices", (req,res) => {
  pool
      .query("SELECT name, price FROM foodbev")
      .then(query_res => {
        console.log(query_res.rows)
        res.send(query_res.rows);
      });
})

app.post("/sendOrder", (req, res) => {
  const onum = req.body.onum;
  const itemList = req.body.itemlist;
  const date = req.body.date;
  const price = req.body.price
  var individualArray = new Array()
  var poundsArray = new Array()

  // function for inserting to orders table
  insertToOrders = () => {
    return new Promise((resolve, reject) => {
      pool
        .query("INSERT INTO orders VALUES (" + onum + ", '" + date + "', '" + price + "')", (error, results) => {
          if (error) return reject(error);
          else {
            return resolve(results)
          }
        })
    })
  }

  // function for inserting into orders_pair_table
  insertToOPT = (oitem) => {
    return new Promise((resolve, reject) => {
      pool
        .query("INSERT INTO orders_pair_table VALUES (" + onum + ", '" + date + "', '" + oitem + "')", (error, results) => {
          if (error) return reject(error);
          else {
            return resolve(results)
          }
        })
    })
  }

  // function getting ingredients based on order 
  ingredientList = () => {
    return new Promise((resolve, reject) => { // promising allows you to wait for request to finish before you move on next part of code
      pool
        .query("SELECT * FROM ingredients INNER JOIN ingredient_pair_table ON ingredient_pair_table.ingredient=ingredients.name INNER JOIN orders_pair_table ON orders_pair_table.item =  ingredient_pair_table.food WHERE ordernumber = " + onum, (error, results) => {
          if (error) return reject(error);
          else {
            return resolve(results)
          }
        })
    })
  }

  // allows you to use query sequentially (avoid race issues)
  async function sequentialQueries() {
    try {
      console.log(itemList.length)
      result1 = await insertToOrders();
      for (let i = 0; i < itemList.length; i++) {
        result2 = await insertToOPT(itemList[i])
        console.log(itemList[i])
        console.log(i)
      }

      // populate individual and pounds list 
      result3 = await ingredientList()
      for (let i = 0; i < result3.rowCount; i++) {
        if (result3.rows[i].units === "individual") {
          console.log(result3.rows[i].name)
          individualArray.push(result3.rows[i].name)
          if (result3.rows[i].units === "pounds") {
            console.log(result3.rows[i].name)
            poundsArray.push(result3.rows[i].name)
          }
        }
      }
      
      // updating inventory amounts 
      for (let i = 0; i < individualArray.length; i++) {
        pool
          .query("UPDATE ingredients SET quantity = quantity - 1 WHERE name = '" + individualArray[i] + "' AND units = 'individual'")
        console.log({ message: individualArray[i] + " individual sent" });
      }

      for (let i = 0; i < poundsArray.length; i++) {
        pool
          .query("UPDATE ingredients SET quantity = quantity - .125 WHERE name = '" + poundsArray[i] + "' AND units = 'pounds'")
        console.log({ message: poundsArray[i] + " pounds sent" });
      }

    }
    catch (error) {

    }
  }
  sequentialQueries()
  res.send({message: "update order fully"})
})

// app.post("/updateOPT", (req,res) => {
//   const onum = req.body.onum;
//   const oitem = req.body.oitem;
//   const date = req.body.date;
//   pool
//     .query("INSERT INTO orders_pair_table VALUES (" + onum + ", '" + date + "', '" + oitem + "')")
//        res.send({response: "item entered into orders_pair_table"})
// })

// app.get("/updateO", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

// app.post("/updateIngredients", (req,res) => {
//   const onum = req.body.onum
//   console.log(onum)
//   var individualArray = new Array()
//   var poundsArray = new Array()

//   ingredientList = () => {
//     return new Promise((resolve, reject) => { // promising allows you to wait for request to finish before you move on next part of code
//      pool
//        .query("SELECT * FROM ingredients INNER JOIN ingredient_pair_table ON ingredient_pair_table.ingredient=ingredients.name INNER JOIN orders_pair_table ON orders_pair_table.item =  ingredient_pair_table.food WHERE ordernumber = " + onum,  (error, results) => {
//          if (error) return reject (error);
//          else {
//          return resolve(results)
//        }
//      })
//    })
//  }

//     async function sequentialQueries() {
//       try {
//         // populate individual and pounds list 
//         result1 = await ingredientList()
//         for ( let i = 0; i < result1.rowCount; i++)  {
//           if (result1.rows[i].units === "individual") {
//             console.log(result1.rows[i].name)
//             individualArray.push(result1.rows[i].name)
//             if (result1.rows[i].units === "pounds") {
//               console.log(query_res.rows[i].name)
//               poundsArray.push(result1.rows[i].name)
//             }        
//           }
//       }

//       for (let i = 0; i < individualArray.length; i++) {
//         pool
//           .query("UPDATE ingredients SET quantity = quantity - 1 WHERE name = '" + individualArray[i] + "' AND units = 'individual'")
//             console.log({message: individualArray[i] + " sent"});
//       }

//       for (let i = 0; i < poundsArray.length; i++) {
//         pool
//           .query("UPDATE ingredients SET quantity = quantity - .125 WHERE name = '" + poundsArray[i] + "' AND units = 'pounds'")
//           console.log({message: poundsArray[i] + " sent"});
//       }
//     }
//       catch(err) {

//       }
//     }
//     sequentialQueries();
//     res.send({message: "updated inventory"})
// });

// app.post("/updateO", (req,res) => {
//   const onum = req.body.onum;
//   const price = req.body.price;
//   const date = req.body.date;
//   pool
//     .query("INSERT INTO orders VALUES (" + onum + ", '" + date + "', '" + price + "')")

//   res.send({response: "price entered into orders"})
// })

app.post("/restockReport", (req,res) => {
  const individualMinimum = 100;
  const poundsMinimum = 10;

  pool
    .query("SELECT name, quantity, units FROM ingredients WHERE (quantity < " + individualMinimum + " AND units = 'individual') OR (quantity < " + poundsMinimum + " AND units = 'pounds')")
    .then(query_res => {
      res.send(query_res.rows);
    });
})

app.post("/seasonalItems",(req,res) => {
  pool
    .query("SELECT * FROM foodbev WHERE name LIKE 's*%'")
    .then(query_res => {
      res.send(query_res.rows);
    });
})

app.post("/newItems",(req,res)=>{
  pool
    .query("SELECT * FROM foodbev WHERE name LIKE 'n*%'")
    .then(query_res => {
      console.log("yes")
      res.send(query_res.rows);
    });
})

/*
app.post("/excessReport1", (req,res) => {
  const name = req.body.name;
  pool
    .query("Select quantity,units from ingredients where name = '" + item + "'")
    .then(query_res => {
      res.send(query_res.rows);
    })
})
*/

app.post("/excessReport", (req,res) => {
    res.set('Access-Control-Allow-Origin', 'http:localhost:3000' )
    const Tdate = req.body.Tdate;
    const Fdate = req.body.Fdate;
    //console.log(Fdate)
    //console.log(Tdate)
    var array = new Array();
    tempArray = () => {
        return new Promise((resolve, reject) => {
          pool
            .query("SELECT ingredients.name, COUNT(*) FROM ingredients INNER JOIN ingredient_pair_table ON ingredient_pair_table.ingredient=ingredients.name INNER JOIN orders_pair_table ON orders_pair_table.item =  ingredient_pair_table.food Where date BETWEEN '" + Fdate + "' AND '"+  Tdate +"' Group by name Order by name", (error, results) => {
              if (error) return reject(error);
              else {
                return resolve(results)
              }
            })
        })
      }
    getItems = (name) => {
      return new Promise((resolve, reject) => {
        pool
          .query("Select quantity,units from ingredients where name = '" + name + "'", (error, results) => {
            if (error) return reject(error);
            else {
              return resolve(results)
            }
          })
      })
      
    }
    
    async function compare(){
      result1 = await tempArray();
      console.log(result1.rows)
      for ( var i = 0 ; i < result1.rowCount; i++){
        result2 = await getItems(result1.rows[i].name);
     
        var num = result1.rows[i].count;
       
        
        console.log("in inventory: "+result2.rows[0].quantity)
        if (result2.rows[0].units === "pounds"){
            num *= .125;
        }
    
  
        if (1 - (result2.rows[0].quantity /(parseFloat(result2.rows[0].quantity) + parseFloat(num))) < .1){
            
            array.push([result1.rows[i].name, num])
        }
      }
  
      res.send(array);
    }
    compare();
    
  })

app.post( "/getIng", (req, res) => {
  const name = req.body.name

  pool
  .query("SELECT ingredient FROM ingredient_pair_table WHERE food = '" + name  + "' ")
  .then(query_res => {
    res.send(query_res.rows);
  });
})

app.post("/rmItem", (req,res) => {
  const name = req.body.name
  

  pool
    .query("UPDATE ingredients SET quantity = quantity - 1 WHERE name = '" + name + "' AND units = 'individual'")
    .then(query_res => {
      res.send(query_res.rows);
    });
  pool
    .query("UPDATE ingredients SET quantity = quantity - .125 WHERE name = '" + name + "' AND units = 'pounds'")
    .then(query_res => {
      res.send(query_res.rows);
    });
})




app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


//gbjksdbgjkfdshgjkbdsjkgsdklsgsd
//fbjakbfjkasbjkfbajksbfkj


//Comment for wayland me

//fjdioapfdiajdf 


// test for riley