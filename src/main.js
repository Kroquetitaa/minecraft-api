const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./utils/database/db.js');
const { setUpCloudinary } = require('./utils/cloudinary/cloudinary.js');

const UsersRoutes = require('./infraestructure/routes/user.routes.js');
const VersionsRoutes = require('./infraestructure/routes/versions.routes.js');
const ItemsVersions = require('./infraestructure/routes/Items.routes.js');
const GamesRoutes = require('./infraestructure/routes/games.routes.js');
const CharactersRoutes = require('./infraestructure/routes/characters.routes.js');

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

app.use('/api/users', UsersRoutes );
app.use('/api/versions', VersionsRoutes);
app.use('/api/items', ItemsVersions);
app.use('/api/games', GamesRoutes);
app.use('/api/characters', CharactersRoutes);

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
