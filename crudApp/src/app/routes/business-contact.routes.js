module.exports = (app, auth) => {
    const businessContactController = require('../controllers/business-contact.controller.js');

    // Create a new Project
    app.post('/businessContact', auth, businessContactController.create);

    // Get all businessContacts
    app.get('/businessContact', auth, businessContactController.find);

    // Get a businessContact
    app.get('/businessContact/:businessContactID', auth, businessContactController.findById);

    // Update a businessContact
    app.put('/businessContact/:businessContactID', auth, businessContactController.update);

    // Delete a businessContact
    app.delete('/businessContact/:businessContactID', auth, businessContactController.delete);
}