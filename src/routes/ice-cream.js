const express = require('express');
const fs = require('fs');
const app = express();
const {loadMenu,storeMenu} = require('./../helperFunction/helper');

app.use((req, res, next) => {
    if (!fs.existsSync('menu.json')) {
        fs.writeFileSync('menu.json', '[]', 'utf8');
    }
    next();
});

// Create operation for adding a new ice cream specialty to the menu
app.post('/menu', (req, res) => {
    try {
        // Extract the new ice cream specialty details from the request query parameters
        const newItem = {
            code: req.query.code,
            name: req.query.name,
            // Parse the ingredients since they're expected to be in a JSON format in the query
            ingredients: JSON.parse(req.query.ingredient),
            price: parseFloat(req.query.price),
            // Convert the avail query parameter to a boolean
            available: req.query.avail.toLowerCase() === 'true'
        };
        
        // Load the current menu using the helper function
        const menu = loadMenu();
        
        // Check if an ice cream specialty with the same code already exists in the menu
        const existingItem = menu.find(item => item.code === newItem.code);
        if (existingItem) {
            res.status(400).send('Item with this code already exists.');
            return;
        }
        
        // Add the new ice cream specialty to the menu
        menu.push(newItem);
        
        // Save the updated menu using the helper function
        storeMenu(menu);
        
        // Respond with a success message
        res.status(200).send('OK');
    } catch (error) {
        // Handle any errors that may occur during the operation
        console.error('Error adding new item to menu:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Read operation to retrieve all ice cream specialties from the menu
app.get('/menu', (req, res) => {
    try {
        // Load the current menu using the helper function
        const menu = loadMenu();
        
        // Respond with the menu items as a JSON string and a status code of 200
        res.status(200).json(menu);
    } catch (error) {
        // Handle any errors that may occur during the operation
        console.error('Error retrieving items from menu:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Update operation to modify attributes of an ice cream specialty in the menu
app.put('/menu', (req, res) => {
    try {
        // Extract the required details from the request query parameters
        const codeToUpdate = req.query.code;
        const newPrice = parseFloat(req.query.price);
        const newIngredients = JSON.parse(req.query.ingredient);
        const newAvailability = req.query.avail.toLowerCase() === 'true';
        
        // Load the current menu using the helper function
        const menu = loadMenu();

        // Find the ice cream specialty with the provided code
        const itemToUpdate = menu.find(item => item.code === codeToUpdate);
        if (!itemToUpdate) {
            res.status(404).send('Item with the provided code not found.');
            return;
        }

        // Update the specified attributes of the found ice cream specialty
        if (newPrice) itemToUpdate.price = newPrice;
        if (newIngredients) itemToUpdate.ingredients = newIngredients;
        if (newAvailability !== undefined) itemToUpdate.available = newAvailability;

        // Save the updated menu using the helper function
        storeMenu(menu);
        
        // Respond with a success message
        res.status(200).send('Item updated successfully');
    } catch (error) {
        // Handle any errors that may occur during the operation
        console.error('Error updating item in menu:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Delete operation to remove an ice cream specialty from the menu
app.delete('/menu', (req, res) => {
    try {
        // Extract the code of the ice cream specialty to delete from the request query parameters
        const codeToDelete = req.query.code;
        
        // Load the current menu using the helper function
        const menu = loadMenu();

        // Check if the ice cream specialty with the provided code exists in the menu
        const itemIndex = menu.findIndex(item => item.code === codeToDelete);
        if (itemIndex === -1) {
            res.status(404).send('Item with the provided code not found.');
            return;
        }

        // Remove the found ice cream specialty from the menu
        menu.splice(itemIndex, 1);

        // Save the updated menu using the helper function
        storeMenu(menu);
        
        // Respond with a success message
        res.status(200).send('Item deleted successfully');
    } catch (error) {
        // Handle any errors that may occur during the operation
        console.error('Error deleting item from menu:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.all('/menu*', (req, res) => {
    res.status(400).send('BAD REQUEST');
});

module.exports = app;