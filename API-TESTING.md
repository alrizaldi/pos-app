# POS Application - API Testing

This directory contains tools to help you test the POS application API.

## Postman Collection

The `POS-App-API.postman_collection.json` file contains a collection of API requests you can import into Postman to test the backend API.

### Importing the Collection

1. Open Postman
2. Click on "Import" in the top left corner
3. Select the `POS-App-API.postman_collection.json` file
4. The collection will be imported with all the API requests

### Using the Collection

1. First, register a user using the "Auth > Register User" request
2. Then login using the "Auth > Login" request
3. Copy the token from the response
4. Set the token as the value for the `token` variable in Postman
5. Now you can use all other requests which require authentication

## Initialization Script

The `init-app.js` script will create a default admin user and some sample data to help you get started.

### Running the Script

1. Make sure the backend server is running (`npm run dev` in the backend directory)
2. Run the script:
   ```
   node init-app.js
   ```

This will:
1. Create an admin user (username: admin, password: password123)
2. Login as the admin user to get a token
3. Create a sample store
4. Create sample products

After running this script, you can login to the frontend with:
- Username: admin
- Password: password123