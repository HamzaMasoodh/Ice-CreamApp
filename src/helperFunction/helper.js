const fs = require('fs');
const path = require('path');
const MENU_PATH = path.join(__dirname, '..', 'db', 'menu.json');
// Helper function to load the menu from menu.json
function loadMenu() {
    try {
        const data = fs.readFileSync(MENU_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading menu:', err);
        return [];
    }
}

// Helper function to store the updated menu to menu.json
function storeMenu(menu) {
    try {
        fs.writeFileSync(MENU_PATH, JSON.stringify(menu, null, 2));
    } catch (err) {
        console.error('Error writing to menu:', err);
    }
}


module.exports = {loadMenu,storeMenu}