const VersionsRoutes = require('express').Router();
const {authorize} = require('../middleware/auth.js');
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

VersionsRoutes.post(pathCreate,[authorize], createVersion);
VersionsRoutes.get(pathAll, getAllVersions);
VersionsRoutes.get(pathSingle, getSingleVersion);
VersionsRoutes.get(pathMultiple, getMultipleVersions);
VersionsRoutes.patch(pathUpdated,[authorize], update);
VersionsRoutes.delete(pathDelete,[authorize], remove);

module.exports = VersionsRoutes;
