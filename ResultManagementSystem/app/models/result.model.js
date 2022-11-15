const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Result = sequelize.define("result", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNULL: false,
        autoIncrement: true
      },
      rollNumber:{
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      dob: {
        type: DataTypes.DATEONLY
      },
      score: {
        type: DataTypes.INTEGER
      }
    });
  
    return Result;
  };
  