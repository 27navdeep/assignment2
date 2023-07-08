module.exports = (app) => {
    const projectController = require('../controllers/project.controller.js');

    // Create a new Project
    app.post('/project', projectController.create);

    // Get all projects
    app.get('/project', projectController.find);

    // Get a project
    app.get('/project/:projectID', projectController.findById);

    // Update a project
    app.put('/project/:projectID', projectController.update);

    // Delete a project
    app.delete('/project/:projectID', projectController.delete);
}