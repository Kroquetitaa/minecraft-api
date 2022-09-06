const Versions = require('../schemas/versions.schema.js');
const { setError } = require('../../utils/error/error.js');
const { status, messagesVersions } = require('../../utils/helpers/helpers.js');
const ErrorFieldsException = require('../errors/missingFields.js');
const { Ok, Updated, Created, Internal_Server_Error, Not_found } = status;
const {
  successCreate,
  successAll,
  errorAll,
  errorSingle,
  errorMultiple,
  successSingle,
  successMultiple,
  notFound,
  successUpdate,
  errorDelete,
  deleted,
} = messagesVersions;

const createVersion = async (req, res, next) => {
  try {
    const newVersion = new Versions(req.body);
    if (!newVersion.version)
      throw new ErrorFieldsException('You haven´t assigned a version');
    const versionInDB = await newVersion.save();
    return res.json({
      status: Created,
      message: successCreate,
      result: versionInDB,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, error.message));
  }
};

const getAllVersions = async (req, res, next) => {
  try {
    const versions = await Versions.find();
    return res.json({
      status: Ok,
      message: successAll,
      results: versions,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorAll));
  }
};

const getSingleVersion = async (req, res, next) => {
  try {
    const { version } = req.params;
    const versions = await Versions.find({ version: version });
    if (!versions) return next(setError(Not_found, notFound));
    return res.json({
      status: Ok,
      message: successSingle,
      result: versions,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorSingle));
  }
};

const getMultipleVersions = async (req, res, next) => {
  try {
    const { version } = req.params;
    let versions = version.split(',');
    const multipleVersions = await Versions.find({ version: versions });
    if (!multipleVersions) return next(setError(Not_found, notFound));
    return res.json({
      status: Ok,
      message: successMultiple,
      results: multipleVersions,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorMultiple));
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const version = new Versions(req.body);
    version._id = id;
    const updatedVersion = await Versions.findByIdAndUpdate(id, version);
    if (!updatedVersion) return next(setError(Not_found, notFound));
    return res.json({
      status: Updated,
      message: successUpdate,
      result: updatedVersion,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorSingle));
  }
};

const remove = async (req, res, next) => {
  try {
    const { version } = req.params;
    const deletedVersion = await Versions.findOneAndRemove({
      version: version,
    });
    if (!deletedVersion) return next(setError(Not_found, notFound));
    return res.json({
      status: Ok,
      message: deleted,
      result: deletedVersion,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorDelete));
  }
};

module.exports = {
  createVersion,
  getAllVersions,
  getSingleVersion,
  getMultipleVersions,
  update,
  remove,
};
