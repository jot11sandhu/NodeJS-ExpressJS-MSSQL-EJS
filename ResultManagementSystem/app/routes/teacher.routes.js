module.exports = app => {
    const results = require("../controllers/result.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Result
    router.post("/", results.create);
  
    // Retrieve all results
    router.get("/", results.findAll);
  
    // Update a Result with id
    router.post("/edit/:id", results.update);
    
    // Delete a Result with id
    router.post("/delete/:id", results.delete);

    // Retrieve one result
    router.post("/:rollNumber/:name", results.findOne);
  
    app.use('/api/results', router);
  };