var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    displayItems();
});

function displayItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].id}  | Item: ${res[i].product_name} | Price: $${res[i].price}`);
        };
        promptCustomer();
    })
};

function promptCustomer() {
    inquirer.prompt([
        {
        type: "input",
        name: "id",
        message: "Please enter the ID of the item you would like to buy",
        },
        {
        type: "input",
        name: "quantity",
        message: "Please enter the quantity you would like to buy"
        }
    ]).then(function(response) {
        // if not enough items, log insufficient quantity
        // if enough items
            //somehow get price by id and multiply by quantity for total
            //update database to reflect new quantity
    })
};