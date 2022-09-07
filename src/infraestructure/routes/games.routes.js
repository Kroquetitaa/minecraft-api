const GamesRoutes = require('express').Router();
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

GamesRoutes.post(pathCreate, createNewGame);
GamesRoutes.get(pathAll, getAllGames);
GamesRoutes.get(pathGameID, getGameID);
GamesRoutes.get(pathGame, getGame);
GamesRoutes.get(pathMultipleGameID, getMultipleGameID);
GamesRoutes.get(pathMultipleGame, getMultipleGame);
GamesRoutes.get(pathFilter, filter);
GamesRoutes.patch(pathUpdated, update);
GamesRoutes.delete(pathRemove, removeID);
module.exports = GamesRoutes;
