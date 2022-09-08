const GamesRoutes = require('express').Router();
const upload = require('../middleware/file.js');
const {authorize} = require('../middleware/auth.js');
const rateLimit = require('express-rate-limit');
const {
  createNewGame,
  getAllGames,
  getGameID,
  getGame,
  getMultipleGameID,
  getMultipleGame,
  filter,
  update, 
  removeID
} = require('../controllers/games.controller.js');
const RoutesItems = require('../api/routesGames.js');
const {
  pathCreate,
  pathAll,
  pathGameID,
  pathGame,
  pathMultipleGameID,
  pathMultipleGame,
  pathFilter,
  pathUpdated,
  pathRemove
} = RoutesItems;

const createRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
});

GamesRoutes.post(pathCreate,[authorize, createRateLimit], upload.single('image'), createNewGame);
GamesRoutes.get(pathAll, getAllGames);
GamesRoutes.get(pathGameID, getGameID);
GamesRoutes.get(pathGame, getGame);
GamesRoutes.get(pathMultipleGameID, getMultipleGameID);
GamesRoutes.get(pathMultipleGame, getMultipleGame);
GamesRoutes.get(pathFilter, filter);
GamesRoutes.patch(pathUpdated,[authorize], update);
GamesRoutes.delete(pathRemove,[authorize], removeID);
module.exports = GamesRoutes;
