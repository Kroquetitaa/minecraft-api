const CharactersRoutes = require('express').Router();
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

CharactersRoutes.post(pathCreate, createCharacter);
CharactersRoutes.get(pathAll, getAllCharacter);
CharactersRoutes.get(pathName, getByName);
CharactersRoutes.get(pathMultipleNames, getMultipleNames);
CharactersRoutes.patch(pathUpdate, update);
CharactersRoutes.delete(pathRemove, remove);

module.exports = CharactersRoutes;
