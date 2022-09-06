const VersionsRoutes = require('express').Router();
const {
  createVersion,
  getAllVersions,
  getSingleVersion,
  getMultipleVersions,
  update,
  remove,
} = require('../controllers/versions.controller.js');
const RoutesVersions = require('../api/routesVersions.js');
const {
  pathCreate,
  pathAll,
  pathSingle,
  pathMultiple,
  pathUpdated,
  pathDelete,
} = RoutesVersions;

VersionsRoutes.post(pathCreate, createVersion);
VersionsRoutes.get(pathAll, getAllVersions);
VersionsRoutes.get(pathSingle, getSingleVersion);
VersionsRoutes.get(pathMultiple, getMultipleVersions);
VersionsRoutes.patch(pathUpdated, update);
VersionsRoutes.delete(pathDelete, remove);

module.exports = VersionsRoutes;
