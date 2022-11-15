const db = require("../models");
const Result = db.results;
const Op = db.Sequelize.Op;

// Create and Save a new Result
exports.create = (req, res) => {
    // Validate request
    if (!req.body.rollNumber && !req.body.name && !req.body.score && !req.body.dob) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Result
    const result = {
      rollNumber: req.body.rollNumber,
      name: req.body.name,
      dob : req.body.dob,
      score: req.body.score
    };
  
    // Save Result in the database
    Result.create(result)
      .then(data => {
        res.redirect('/teacher');
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding the Result."
        });
      });
  };
  
  // Retrieve all Results from the database.
  exports.findAll = (req, res) => {

    Result.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving results."
        });
      });
  };
  
  // Find a single Result with roll number and name
  exports.findOne = (req, res) => {
    const rollNumber = req.params.rollNumber;
    const name = req.params.name;
    var condition = rollNumber && name ? { rollNumber: { [Op.eq]: `${rollNumber}` } , name: { [Op.eq]: `${name}` } } : null
  
    Result.findAll({where : condition})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "No result with rollNumber=" + rollNumber + "and name" + name 
        });
      });
  };
  
  // Update a Result by the roll number in the request
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Result.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.redirect('/teacher');
        } else {
          res.send({
            message: `Cannot update Result with id=${id}. Maybe result was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Result with id=" + id
        });
      });
  };
  
  // Delete a Result with the specified rollNumber in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Result.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.redirect('/teacher');
        } else {
          res.send({
            message: `Cannot delete Result with id=${id}. Maybe Result was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Result with id=" + id
        });
      });
  };
    