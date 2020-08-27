/* 
 Connor McDonough
 8/26/2020
 Deliverr recruiting exercise 
 */

//Unit Test 1 - Happy case

var orderOne = {
    "apple": 5
};

var warehouseOne = [
    {
        "name": "owd",
        "inventory": {
            "apple": 5
        }
    }
];

//Unit Test 2 - Simple split across warehouses

var orderTwo = {
    "apple": 10
};

var warehouseTwo = [
    {
        "name": "owd",
        "inventory": {
            "apple": 5
        }
    },
    {
        "name": "dm",
        "inventory": {
            "apple": 5
        }
    }
];

//Unit Test 3 - Not enough inventory at first warehouse, goes to second (Shipping from one)

var orderThree = {
    "apple": 5,
    "banana": 5,
    "orange": 5
};

var warehouseThree = [
    {
        "name": "owd",
        "inventory": {
            "apple": 5,
            "orange": 5,
            "banana": 2
        }
    },
    {
        "name": "dm",
        "inventory": {
            "banana": 5

        }
    }
];

//Unit Test 4 - Complex split from warehouses

var orderFour = {
    "apple": 5,
    "banana": 10,
    "orange": 5
};

var warehouseFour = [
    {
        "name": "owd",
        "inventory": {
            "apple": 5,
            "orange": 3,
            "banana": 1
        }
    },
    {
        "name": "dm",
        "inventory": {
            "banana": 9,
            "orange": 6

        }
    }
];

//Unit Test 5 - Complex split from warehouses AND not enough inventory at first/Second warehouse AND three warehouses

var orderFive = {
    "apple": 5,
    "banana": 5,
    "orange": 5,
    "pineapple": 6
};

var warehouseFive = [
    {
        "name": "owd",
        "inventory": {
            "apple": 5,
            "orange": 5,
            "banana": 2,
            "pineapple": 2
        }
    },
    {
        "name": "dm",
        "inventory": {
            "banana": 5,
            "pineapple": 2

        }
    },
    {
        "name": "cam",
        "inventory": {
            "banana": 5,
            "pineapple": 2

        }
    }
];

//Unit Test 6 - Simple not enough inventory

var orderSix = {
    "apple": 10
};

var warehouseSix = [
    {
        "name": "owd",
        "inventory": {
            "apple": 4
        }
    }
];

//Unit Test 7 - Order not at any stores

var orderSeven = {
    "apple": 10,
    "banana": 10
};

var warehouseSeven = [
    {
        "name": "owd",
        "inventory": {
            "pear": 4
        }
    },
    {
        "name": "dm",
        "inventory": {
            "orange": 4
        }
    }
];

//Unit Test 8 - No warehouses

var orderEight = {
    "apple": 10,
    "banana": 10
};

var warehouseEight = [];

//Unit Test 9 - No order

var orderNine = {};

var warehouseNine = [
    {
        "name": "owd",
        "inventory": {
            "pear": 4
        }
    },
    {
        "name": "dm",
        "inventory": {
            "orange": 4
        }
    }
];

function shipments(order, warehouses) {
    var outputString = ""; //Holds the collected JSONObjects
    var outputStringMoreThanOneWH = ""; //Is used if an item needs to be collected from more than one warehouses
    var orderCounter = 0; //Counter used for checking how many units are still required to complete an order
    var inventoryCounter = 0; //Counter used for checking how many units are left in a warehouse of a given item
    var unitCounter = 0; //Counter used for checking how many units have been fulflilled
    var warehousesCounter = 0; //Used for counting the total number of warehouses
    var stopper = false; //Used to stop a single order from printing out more than once
    var stopper2 = false; //Used to stop a single order from printing out more than once
    var resetCounter = false; //Used to reset the orderCounter when needed
    var matchAllReadyFound = false; //Used to prevent loop from matching something that is already matched

    for (var orderKey in order) { // Loops through all order items #apple
        orderCounter = order[orderKey];
        unitCounter = 0;
        stopper = false;
        warehousesCounter = 0;
        matchAllReadyFound = false;
        for (var warehousesKey in warehouses) { // Loops through all warehouses #first warehouse
            warehousesCounter++;
            var numOfWarehouses = warehouses.length;

            if (orderCounter === 0) {
                continue;
            }

            for (var inventoryKey in warehouses[warehousesKey].inventory) { //Loops through the inventory of the selected warehouse #apple

                inventoryCounter = warehouses[warehousesKey].inventory[inventoryKey];

                if (orderKey === inventoryKey) {
                    if (stopper === true) {
                        unitCounter = 0;
                    }

                    if (resetCounter === true) {
                        unitCounter = 0;
                        orderCounter = order[orderKey];
                        resetCounter = false;
                    }
                    while (orderCounter > 0 && inventoryCounter > 0) { //Loops until order counter OR inventory counter is <= 0 
                        inventoryCounter--;
                        orderCounter--;
                        unitCounter++;
                    }

                    if (outputString.length !== 0 && stopper === false) {
                        outputString += ", ";
                    }
                    if (orderCounter === 0 && stopper === false) {
                        outputString += "{ " + warehouses[warehousesKey].name + ": { " + orderKey + ": " + unitCounter + " } }";
                    } else if (orderCounter !== 0) { //Used to see if a single warehouse can fulfill an item in the order... If not it will try to split and if that fails then the item in the order is not fulfilled
                        var inventoryCounter2 = 0;
                        var orderCounter2 = order[orderKey];
                        var unitCounter2 = 0;
                        var reset = true;
                        for (var warehousesKey2 in warehouses) {

                            if (warehouses[warehousesKey2].name === warehouses[warehousesKey].name) {
                                continue;
                            }

                            for (var inventoryKey2 in warehouses[warehousesKey2].inventory) {
                                if (orderKey === inventoryKey2) {
                                    if (reset === true) {
                                        inventoryCounter2 = warehouses[warehousesKey2].inventory[inventoryKey2];
                                        reset = false;
                                    }
                                    while (orderCounter2 > 0 && inventoryCounter2 > 0) { //Loops until order counter OR inventory counter is <= 0
                                        inventoryCounter2--;
                                        orderCounter2--;
                                        unitCounter2++;
                                    }
                                    if (orderCounter2 === 0) {
                                        if (outputString.length !== 0) {
                                            //outputString += ", ";
                                        }
                                        if (matchAllReadyFound == false) {
                                            outputString += "{ " + warehouses[warehousesKey2].name + ": { " + orderKey + ": " + unitCounter2 + " } }";
                                            stopper2 = true;
                                            stopper = true;
                                            reset = true;
                                            matchAllReadyFound = true;
                                        }
                                    }
                                }

                            }
                        }
                        if (orderCounter !== 0 && warehousesCounter < numOfWarehouses && stopper2 === false) {
                            if (outputStringMoreThanOneWH.length !== 0) {
                                outputStringMoreThanOneWH += ", ";
                            }
                            outputStringMoreThanOneWH += "{ " + warehouses[warehousesKey].name + ": { " + orderKey + ": " + unitCounter + " } }";
                            stopper = true;
                        }
                        stopper2 = false;
                    }


                    if (orderCounter > 0 && warehousesCounter === numOfWarehouses) {
                        outputStringMoreThanOneWH = "";
                        outputString = outputString.substring(0, outputString.length - 2);
                    } else if (orderCounter === 0 && outputStringMoreThanOneWH.length !== 0) {
                        outputString += outputStringMoreThanOneWH + ", " + "{ " + warehouses[warehousesKey].name + ": { " + orderKey + ": " + unitCounter + " } }";
                        outputStringMoreThanOneWH = "";
                        stopper = false;
                    }
                }
            }

        }
    }
    return "[" + outputString + "]";
}

//Sends the results to the HTML page (index.html)
document.getElementById("unitTest1").innerHTML = "<b>Output: </b>" + shipments(orderOne, warehouseOne);

document.getElementById("unitTest2").innerHTML = "<b>Output: </b>" + shipments(orderTwo, warehouseTwo);

document.getElementById("unitTest3").innerHTML = "<b>Output: </b>" + shipments(orderThree, warehouseThree);

document.getElementById("unitTest4").innerHTML = "<b>Output: </b>" + shipments(orderFour, warehouseFour);

document.getElementById("unitTest5").innerHTML = "<b>Output: </b>" + shipments(orderFive, warehouseFive);

document.getElementById("unitTest6").innerHTML = "<b>Output: </b>" + shipments(orderSix, warehouseSix);

document.getElementById("unitTest7").innerHTML = "<b>Output: </b>" + shipments(orderSeven, warehouseSeven);

document.getElementById("unitTest8").innerHTML = "<b>Output: </b>" + shipments(orderEight, warehouseEight);

document.getElementById("unitTest9").innerHTML = "<b>Output: </b>" + shipments(orderNine, warehouseNine);