const ItemsVersions = require('express').Router();
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

ItemsVersions.post(pathCreate, createNewItem);
ItemsVersions.get(pathAll, getAllItems);
ItemsVersions.get(pathID, getItem);
ItemsVersions.get(pathIDName, getMinecraftIDName);
ItemsVersions.get(pathMultipleID, getMultipleItems);
ItemsVersions.get(pathMultipleIDName, getMultipleMinecraftIDName);
ItemsVersions.get(pathFilter, filter);
ItemsVersions.patch(pathUpdated, update);
ItemsVersions.delete(pathDelete, removeID);

module.exports = ItemsVersions;
