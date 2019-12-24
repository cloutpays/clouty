// Local dependencies
const { handleErrors } = require('../helpers/error');
const { gameSubmitApi, questionSubmitApi } = require('../helpers/game');
const { send } = require('micro');

const postApi = (fn) => async (req, res) => {
  try {
    const parse = req.url.split('/');
    switch (`api/${parse[2]}`) {
      case 'api/submission':
        return await fn(gameSubmitApi(req, res));
      case 'api/question':
        return await fn(questionSubmitApi(req, res));
      default:
        return send(res, 200, { err: 'invalid route' });
    }
  } catch (err) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.error(err);
    return send(res, statusCode, message);
  }
};

module.exports = postApi(handleErrors);
