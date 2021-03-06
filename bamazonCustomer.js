// Require packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// Connect to db
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});

var validID;

// If there isn't an error, display items in db
connection.connect(function (err) {
    if (err) throw err;
    displayItems();
});

// display all IDs, item names, and prices, then prompt customer
function displayItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].id} | Item: ${res[i].product_name} | Price: $${res[i].price}`);
        };
        validID = res.length;
        promptCustomer(validID);
    })
};

// Ask customer for ID and quantity of desired purchase
function promptCustomer(validID) {
    inquirer.prompt([
        {
        type: "input",
        name: "id",
        message: "Please enter the ID of the item you would like to buy",
        validate: function(value) {
            if (value <= validID && value > 0) {
                return true;
            } else {
                return "Please enter a valid ID";
            }
        }
        },
        {
        type: "input",
        name: "quantity",
        message: "Please enter the quantity you would like to buy",
        }
    ]).then(function(response) {
        // Get the item from db with that ID
        connection.query("SELECT * FROM products WHERE id =" + response.id, function (err, res) {
            if (err) throw err;
            // Perform purchase with requested quantity and item
            itemPurchase(response.quantity, res[0]) 
        });
        
    })
};

// Check if enough in stock, if so complete purchase and display total
function itemPurchase(purchaseQuantity, item) {
    if (purchaseQuantity > item.stock_quantity) {
        console.log(`\nInsufficient stock. Please choose a quantity under ${item.stock_quantity}\n`);
        promptCustomer(validID);
    } else {
        var total = purchaseQuantity * item.price;
        console.log(`\nYou purchased ${purchaseQuantity} of the item "${item.product_name}" for a total of $${total}\n`);

        // Update database with new quantity
        connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: item.stock_quantity - purchaseQuantity
                },
                {
                    id: item.id
                }
            ]
        );
        buyOrQuit();
    }
};

// Ask if customer wants to purchase again or quit
function buyOrQuit() {
    inquirer.prompt([
        {
            name: "continue",
            type: "list",
            message: "Would you like to make another purchase or quit?",
            choices: ["Buy something else", "Quit"]
        }
    ]).then(function(response) {
        if (response.continue === "Buy something else") {
            displayItems()
        } else {
            connection.end();
        }
    })
}
