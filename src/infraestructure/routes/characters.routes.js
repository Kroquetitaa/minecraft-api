const CharactersRoutes = require('express').Router();
const upload = require('../middleware/file.js');
const {authorize} = require('../middleware/auth.js');
const rateLimit = require('express-rate-limit');
const {
  createCharacter,
  getAllCharacter,
  getByName,
  getMultipleNames,
  update,
  remove
} = require('../controllers/characters.controller.js');
const RoutesCharacters = require('../api/routesCharacters.js');
const {
  pathCreate,
  pathAll,
  pathName,
  pathMultipleNames,
  pathUpdate,
  pathRemove,
} = RoutesCharacters;

const createRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
});

CharactersRoutes.post(pathCreate,[authorize, createRateLimit], upload.single('image'), createCharacter);
CharactersRoutes.get(pathAll, getAllCharacter);
CharactersRoutes.get(pathName, getByName);
CharactersRoutes.get(pathMultipleNames, getMultipleNames);
CharactersRoutes.patch(pathUpdate,[authorize], update);
CharactersRoutes.delete(pathRemove,[authorize], remove);

module.exports = CharactersRoutes;
