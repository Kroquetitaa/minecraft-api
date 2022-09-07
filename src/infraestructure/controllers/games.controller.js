const Games = require('../schemas/games.schema.js');
const { setError } = require('../../utils/error/error.js');
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

const createNewGame = async (req, res, next) => {
  try {
    const newGame = new Games(req.body);
    if (!newGame.id || !newGame.game)
      throw new ErrorFieldsException('You haven´t assigned a ID || game');
    const newGameInDB = await newGame.save();
    return res.json({
      status: Created,
      message: successCreate('game'),
      result: newGameInDB,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, error.message));
  }
};

const getAllGames = async (req, res, next) => {
  try {
    const games = await Games.find().sort({ id: 'descending' });
    return res.json({
      status: Ok,
      message: successAll('Games'),
      results: games,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorAll('Games')));
  }
};

const getGameID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const gameID = await Games.find({ id: id });
    return res.json({
      status: Ok,
      message: successSingle('GameID'),
      result: gameID,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorSingle('GameID')));
  }
};

const getGame = async (req, res, next) => {
  try {
    const { game } = req.params;
    const games = await Games.find({ game: game });
    return res.json({
      status: Ok,
      message: successSingle('Game'),
      result: games,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorSingle('Game')));
  }
};

const getMultipleGameID = async (req, res, next) => {
  try {
    const { id } = req.params;
    let multipleGameID = id.split(',');
    const multipleGames = await Games.find({ id: multipleGameID });
    if (!multipleGames) return next(setError(Not_found, notFound('GameID')));
    return res.json({
      status: Ok,
      message: successSingle('Game'),
      result: multipleGames,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorMultiple('GameID')));
  }
};

const getMultipleGame = async (req, res, next) => {
  try {
    const { game } = req.params;
    let multipleGameID = game.split(',');
    const multipleGames = await Games.find({ game: multipleGameID });
    if (!multipleGames) return next(setError(Not_found, notFound('Game')));
    return res.json({
      status: Ok,
      message: successSingle('Game'),
      result: multipleGames,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorMultiple('Game')));
  }
};

const filter = async (req, res, next) => {
  try {
    const values = req.query;
    const filterValues = await Games.find(values);
    if (!filterValues) return next(setError(Not_found, notFound(values)));
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
    const { id } = req.params;
    const game = new Games(req.body);
    game._id = id;
    const updatedGame = await Games.findByIdAndUpdate(id, game);
    if (!updatedGame) return next(setError(Not_found, notFound('Game')));
    return res.json({
      status: Updated,
      message: successUpdate('Game'),
      data: updatedGame,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorUpdate('Game')));
  }
};

const removeID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedID = await Games.findOneAndDelete({ id: id });
    if (!deletedID) return next(setError(Not_found, notFound('ID')));
    return res.json({
      status: Ok,
      message: deleted('ID'),
      data: deletedID,
    });
  } catch (error) {
    return next(setError(Internal_Server_Error, errorDelete('ID')));
  }
};

module.exports = {
  createNewGame,
  getAllGames,
  getGameID,
  getGame,
  getMultipleGameID,
  getMultipleGame,
  filter,
  update,
  removeID,
};
