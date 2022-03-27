const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
  const user = process.env.DB_USER;
  const pass = process.env.DB_PASS;
  const cluster = process.env.DB_CLUSTER;
  const database = process.env.DB_NAME_DEV;

  try {
    const uri = `mongodb+srv://${user}:${pass}${cluster}/${database}`;

    const mongooseconexion = await mongoose.connect(uri, {
      UseNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB Conectada');
    return mongooseconexion;
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de inicializar DB');
  }
};

module.exports = { dbConnection };

// `mongodb+srv://${user}:${passwd}@manucluster0.xmenl.mongodb.net/${databaseName}`;
