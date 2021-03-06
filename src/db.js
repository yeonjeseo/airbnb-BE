import mongoose from 'mongoose';

mongoose.connect(
  // 'mongodb://local:1@0.0.0.0:27017/airbnb?authSource=admin',
  'mongodb://localhost:27017/airnbn',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

const handleOpen = () => console.log('✅ Connected to DB ✅ ');
const handleError = (error) => console.log('DB Error', error);

db.on('error', handleError);
//open occurs only once
db.once('open', handleOpen);

export default db;
