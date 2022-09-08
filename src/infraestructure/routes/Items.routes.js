const ItemsVersions = require('express').Router();
const upload = require('../../middleware/file.js');
const rateLimit = require('express-rate-limit');
const {
  createNewItem,
  getAllItems,
  getItem,
  getMinecraftIDName,
  getMultipleItems,
  getMultipleMinecraftIDName,
  filter,
  update,
  removeID
} = require('../controllers/items.controller.js');
const RoutesItems = require('../api/routesItems.js');

const {
    pathCreate,
  pathAll,
  pathID,
  pathIDName,
  pathMultipleID,
  pathMultipleIDName,
  pathFilter,
  pathUpdated,
  pathDelete,
} = RoutesItems;

const createRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
});

ItemsVersions.post(pathCreate,[createRateLimit], upload.single('imageItem'), createNewItem);
ItemsVersions.get(pathAll, getAllItems);
ItemsVersions.get(pathID, getItem);
ItemsVersions.get(pathIDName, getMinecraftIDName);
ItemsVersions.get(pathMultipleID, getMultipleItems);
ItemsVersions.get(pathMultipleIDName, getMultipleMinecraftIDName);
ItemsVersions.get(pathFilter, filter);
ItemsVersions.patch(pathUpdated, update);
ItemsVersions.delete(pathDelete, removeID);

module.exports = ItemsVersions;
