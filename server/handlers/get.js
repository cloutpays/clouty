// Local dependencies
const { handleErrors } = require('../helpers/error');
const {
  submissionsRetrieveApi,
  questionsRetrieveApi,
  questionRetrieveApi,
  userSubmissionsRetrieveApi,
} = require('../helpers/game');
const { userRetrieveApi, usersApi } = require('../helpers/user');
const {
  stripeApi,
  payoutsByUserApi,
  allPayoutsApi,
  getUserTransactionsApi,
} = require('../helpers/stripe');
const { send } = require('micro');

const getApi = (fn) => async (req, res) => {
  try {
    const parse = req.url.split('/');
    console.log(`get api/${parse[2]}`);
    switch (`api/${parse[2]}`) {
      case 'api/submissions':
        return await fn(submissionsRetrieveApi(req, res));
      case 'api/userTransactions':
        return await fn(getUserTransactionsApi(req, res));
      case 'api/userSubmissions':
        return await fn(userSubmissionsRetrieveApi(req, res));
      case 'api/userPayouts':
        return await fn(payoutsByUserApi(req, res));
      case 'api/allUserPayouts':
        return await fn(allPayoutsApi(req, res));
      case 'api/questions':
        return await fn(questionsRetrieveApi(req, res));
      case 'api/question':
        return await fn(questionRetrieveApi(req, res));
      case 'api/user':
        return await fn(userRetrieveApi(req, res));
      case 'api/users':
        return await fn(usersApi(req, res));
      case 'api/checkout':
        return await fn(stripeApi(req, res));

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
