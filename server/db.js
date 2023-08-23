const mongoose = require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/testApp";

const connectToMongo = async ()=>{
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("connected to mongo successfully");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectToMongo;
