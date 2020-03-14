// Local dependencies
const { handleErrors } = require('../helpers/error');
const {
  gameSubmitApi,
  questionSubmitApi,
  userQuestionSubmitApi,
} = require('../helpers/game');
const { userApi } = require('../helpers/user');
const { send } = require('micro');
const { hookApi, payoutApi } = require('../helpers/stripe');

const postApi = (fn) => async (req, res) => {
  try {
    const parse = req.url.split('/');
    switch (`api/${parse[2]}`) {
      case 'api/submission':
        return await fn(gameSubmitApi(req, res));
      case 'api/question':
        return await fn(questionSubmitApi(req, res));
      case 'api/userquestion':
        return await fn(userQuestionSubmitApi(req, res));
      case 'api/user':
        return await fn(userApi(req, res));
      case 'api/payout':
        return await fn(payoutApi(req, res));
      case 'api/hooks':
        return await fn(hookApi(req, res));
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
