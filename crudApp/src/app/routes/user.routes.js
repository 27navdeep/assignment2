module.exports = (app) => {
    const userController = require('../controllers/user.controller.js');

    // Validate a user    
    app.post('/login', userController.login);

    // Create a new User
    app.post('/register', userController.create);

    // Get all users
    app.get('/user', userController.find);

    // Get a user
    app.get('/user/:userID', userController.findById);

    // Update a user
    app.put('/user/:userID/update', userController.update);

    // Delete a user
    app.delete('/user/:userID', userController.delete);
}