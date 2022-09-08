const Character = require('../schemas/characters.schema.js');
const { setError } = require('../../utils/error/error.js');
const { status, messages } = require('../../utils/helpers/helpers.js');
const { deleteFile } = require('../middleware/delete-file.js');
const ErrorFieldsException = require('../errors/missingFields.js');
const { Ok, Accepted, Updated, Created, Internal_Server_Error, Not_found } =
  status;
const {
  successCreate,
  successAll,
  errorAll,
  errorSingle,
  errorMultiple,
  successSingle,
  successMultiple,
  notFound,
  errorFilter,
  succesFilter,
  successUpdate,
  errorUpdate,
  errorDelete,
  deleted,
} = messages;

const createCharacter = async (req, res, next) => {
  try {
    const newCharacter = new Character(req.body);
    if (req.file) newCharacter.image = req.file.path;
    if (!newCharacter.name)
      throw new ErrorFieldsException('You haven´t assigned name');
    const newCharacterInDB = await newCharacter.save();
    return res.json({
      status: Created,
      message: successCreate('Character'),
      result: newCharacterInDB,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, error.message));
  }
};

const getAllCharacter = async (req, res, next) => {
  try {
    const characters = await Character.find().sort({ id: 'descending' });
    return res.json({
      status: Ok,
      message: successAll('Characters'),
      results: characters,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorAll('Characters')));
  }
};

const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const names = await Character.findOne({ name: name });
    return res.json({
      status: Ok,
      message: successSingle('Name'),
      result: names,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorSingle('Name')));
  }
};

const getMultipleNames = async (req, res, next) => {
  try {
    const { name } = req.params;
    let multipleName = name.split(',');
    switch (multipleName) {
    }
    const multipleNames = await Character.find({ name: multipleName });
    if (!multipleNames) return next(setError(Not_found, notFound('Names')));
    return res.json({
      status: Ok,
      message: successSingle('Names'),
      result: multipleNames,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorMultiple('Names')));
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = new Character(req.body);
    character._id = id;
    const updatedCharacter = await Character.findByIdAndUpdate(id, character);
    if (!updatedCharacter)
      return next(setError(Not_found, notFound('Character')));
    return res.json({
      status: Updated,
      message: successUpdate('Character'),
      data: updatedCharacter,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorUpdate('Character')));
  }
};

const remove = async (req, res, next) => {
  try {
    const { name } = req.params;
    const deletedName = await Character.findOneAndDelete({ name: name });
    if (deletedName.image) deleteFile(deletedName.image);
    if (!deletedName) return next(setError(Not_found, notFound('Name')));
    return res.json({
      status: Ok,
      message: deleted('Name'),
      data: deletedName,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorDelete('Name')));
  }
};

module.exports = {
  createCharacter,
  getAllCharacter,
  getByName,
  getMultipleNames,
  update,
  remove,
};
