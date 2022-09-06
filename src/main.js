const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./utils/database/db');

const VersionsRoutes = require('./infraestructure/routes/versions.routes.js');
const ItemsVersions = require('./infraestructure/routes/Items.routes.js');

connectDB();
const app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.use(cors());

const PORT = process.env.PORT || 8080;

app.use('/api', VersionsRoutes);
app.use('/api/items', ItemsVersions);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.use((req, res, next) => {
  setImmediate(() => {
    next(new Error('Something went wrong'));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
