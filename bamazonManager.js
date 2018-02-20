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

// If there isn't an error, display options
connection.connect(function (err) {
    if (err) throw err;
    displayOptions();
});

function displayOptions() {
    console.log("\n");
    inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "What would you like to do?",
            choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product", "Quit"]
        }
    ]).then(function(response) {
        switch(response.option) {
            case "View products for sale":
                displayItems()
                break;
            case "View low inventory":
                lowInventory()
                break;
            case "Add to inventory":
                addInventory()
                break;
            case "Add new product":
                addProduct()
                break;
            case "Quit":
                connection.end()
                break;
        }
    })
};


// display all IDs, item names, and prices, and quantities
function displayItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].id} | Item: ${res[i].product_name} | Price: $${res[i].price} | Stock Quantity: ${res[i].stock_quantity}`);
        };
        // validID = res.length;
        displayOptions();
    })
};

// Display items with inventory less than 5
function lowInventory() {
    console.log("functionality coming soon");
    displayOptions();
};

// Add more of any item in database
function addInventory() {
    console.log("functionality coming soon");
    displayOptions();
};

// Add a new product to the database
function addProduct() {
    console.log("functionality coming soon");
    displayOptions();
};
