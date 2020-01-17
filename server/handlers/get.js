// Local dependencies
const { handleErrors } = require('../helpers/error');
const {
  submissionsRetrieveApi,
  questionsRetrieveApi,
  questionRetrieveApi,
  userSubmissionsRetrieveApi,
} = require('../helpers/game');
const { send } = require('micro');

const getApi = (fn) => async (req, res) => {
  try {
    const parse = req.url.split('/');
    switch (`api/${parse[2]}`) {
      case 'api/submissions':
        return await fn(submissionsRetrieveApi(req, res));
      case 'api/userSubmissions':
        return await fn(userSubmissionsRetrieveApi(req, res));
      case 'api/questions':
        return await fn(questionsRetrieveApi(req, res));
      case 'api/question':
        return await fn(questionRetrieveApi(req, res));
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
module.exports = getApi(handleErrors);
