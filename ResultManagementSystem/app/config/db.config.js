module.exports = {
  database: 'ResultManagement',
    HOST: 'localhost',
    PORT: 1433,
    dialect: 'mssql',
    dialectOptions: {
      authentication: {
        type: 'ntlm',
        options: {
          userName: 'USERNAME',
          password: 'PASSWORD',
          domain: 'DOMAIN',
        },
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };