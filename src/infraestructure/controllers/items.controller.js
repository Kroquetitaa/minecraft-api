const Items = require('../schemas/items.schema.js');
const { setError } = require('../../utils/error/error.js');
const { deleteFile } = require('../../middleware/delete-file.js');
const { status, messages } = require('../../utils/helpers/helpers.js');
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

const createNewItem = async (req, res, next) => {
  try {
    const newItem = new Items(req.body);
    if (req.file) newItem.imageItem = req.file.path;
    if (!newItem.minecraftIDName || !newItem.minecraftID)
      throw new ErrorFieldsException(
        'You haven´t assigned a minecraftIDName || minecraftID',
      );
    const newItemInDB = await newItem.save();
    return res.json({
      status: Created,
      message: successCreate('items'),
      result: newItemInDB,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, error.message));
  }
};

const getAllItems = async (req, res, next) => {
  try {
    const items = await Items.find();
    return res.json({
      status: Ok,
      message: successAll('items'),
      results: items,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorAll('items')));
  }
};

const getItem = async (req, res, next) => {
  try {
    const { minecraftID } = req.params;
    const item = await Items.find({ minecraftID: minecraftID });
    if (!item) return next(setError(Not_found, notFound('Item')));
    return res.json({
      status: Ok,
      message: successSingle('item'),
      result: item,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorSingle('item')));
  }
};

const getMinecraftIDName = async (req, res, next) => {
  try {
    const { minecraftIDName } = req.params;
    const item = await Items.find({ minecraftIDName: minecraftIDName });
    if (!item) return next(setError(Not_found, notFound('minecraftIDName')));
    return res.json({
      status: Ok,
      message: successSingle('item'),
      result: item,
    });
  } catch (error) {
    return next(
      setError(Internal_Server_Error, errorSingle('minecraftIDName')),
    );
  }
};

const getMultipleItems = async (req, res, next) => {
  try {
    const { minecraftID } = req.params;
    let multipleMinecraftID = minecraftID.split(',');
    const multipleItems = await Items.find({
      minecraftID: multipleMinecraftID,
    });
    if (!multipleItems)
      return next(setError(Not_found, notFound('Multiple Items')));
    return res.json({
      status: Ok,
      message: successMultiple('items'),
      results: multipleItems,
    });
  } catch (error) {
    return next(
      setError(Internal_Server_Error, errorMultiple('Multiple items')),
    );
  }
};

const getMultipleMinecraftIDName = async (req, res, next) => {
  try {
    const { minecraftIDName } = req.params;
    let multipleMinecraftIDName = minecraftIDName.split(',');
    const multipleItems = await Items.find({
      minecraftIDName: multipleMinecraftIDName,
    });
    if (!multipleItems)
      return next(setError(Not_found, notFound('Multiples MinecraftIDName')));
    return res.json({
      status: Ok,
      message: successMultiple('MinecraftIDName'),
      results: multipleItems,
    });
  } catch (error) {
    return next(
      setError(Internal_Server_Error, errorMultiple('MinecraftIDName')),
    );
  }
};

const filter = async (req, res, next) => {
  try {
    const values = req.query;
    const filterValues = await Items.find(values);
    console.log(filterValues);
    if (!filterValues) return next(setError(Not_found, notFound('Filter')));
    return res.json({
      status: Ok,
      message: succesFilter(),
      results: filterValues,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorFilter()));
  }
};

const update = async (req, res, next) => {
  try {
    const { minecraftID } = req.params;
    const item = new Items(req.body);
    item._id = minecraftID;
    const updateItem = await Items.findByIdAndUpdate(minecraftID, item);
    if (!updateItem) return next(setError(Not_found, notFound(minecraftID)));
    return res.json({
      status: Updated,
      message: successUpdate(minecraftID),
      data: updateItem,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorUpdate('MinecraftID')));
  }
};

const removeID = async (req, res, next) => {
  try {
    const { minecraftID } = req.params;
    const deletedID = await Items.findOneAndDelete({
      minecraftID: minecraftID,
    });
    if (deletedID.imageItem) deleteFile(deletedID.imageItem);
    if (!deletedID) return next(setError(Not_found, notFound('minecraftID')));
    return res.json({
      status: Accepted,
      message: deleted('MinecraftID'),
      data: deletedID,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorDelete('MinecraftID')));
  }
};

module.exports = {
  createNewItem,
  getAllItems,
  getItem,
  getMinecraftIDName,
  getMultipleItems,
  getMultipleMinecraftIDName,
  filter,
  update,
  removeID,
};
