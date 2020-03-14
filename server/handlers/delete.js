// Local dependencies
const { handleErrors } = require('../helpers/error');
const { questionRemoveApi, submissionsRemovalApi } = require('../helpers/game');
const { send } = require('micro');

const postApi = (fn) => async (req, res) => {
  try {
    const parse = req.url.split('/');
    switch (`${parse[2]}`) {
      case 'question':
        return await fn(questionRemoveApi(req, res));
      case 'userSubmissions':
        return await fn(submissionsRemovalApi(req, res));
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
