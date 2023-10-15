# Overview
"Chilly Delights" is a brand-new ice cream shop that offers a range of delicious specialties. This repository contains the server-side code to power the website for "Chilly Delights". The website allows customers to view the ice cream menu, and the management to add, delete, and update menu items.

# Features
- File-based Data Storage: Menu items are stored in a JSON file, making data management simple and straightforward.
- Manage Ice Cream Specialties: Each ice cream specialty is represented as a JSON object with attributes such as Code, Name, and Ingredients.
# Setup and Installation
- Clone the repository.
- Navigate to the project directory.
- Run npm install to install the necessary dependencies.
- Use npm start to run the server.
- Access the API endpoints through your preferred API client or browser.

## API Endpoints

### 1. Get All Ice Cream Specialties
- **Endpoint:** `/api/specialties`
- **HTTP Method:** `GET`
- **Description:** Fetches a list of all ice cream specialties.

### 2. Get a Specific Ice Cream Specialty
- **Endpoint:** `/api/specialties/:code`
- **HTTP Method:** `GET`
- **Description:** Fetches details of a specific ice cream specialty based on its unique code.

### 3. Add a New Ice Cream Specialty
- **Endpoint:** `/api/specialties`
- **HTTP Method:** `POST`
- **Description:** Adds a new ice cream specialty. Requires name, code, and ingredients in the request body.

### 4. Update an Ice Cream Specialty
- **Endpoint:** `/api/specialties/:code`
- **HTTP Method:** `PUT`
- **Description:** Updates the details of an existing ice cream specialty based on its unique code. Can update name and/or ingredients.

### 5. Delete an Ice Cream Specialty
- **Endpoint:** `/api/specialties/:code`
- **HTTP Method:** `DELETE`
- **Description:** Deletes a specific ice cream specialty based on its unique code.

# Contributing
If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

# License
[MIT Licence](https://github.com/HamzaMasoodh/Ice-CreamApp/blob/main/LICENSE)
