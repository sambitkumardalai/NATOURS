const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connection successful 😎');
  });
port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server listening on ${port} 😎`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION 💥 shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log(err);
  console.log('UNCAUGHT EXCEPTION 💥 shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
