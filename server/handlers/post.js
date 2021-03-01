// Local dependencies
const { handleErrors } = require('../helpers/error');
const { dbRefresh } = require('../helpers');
const {
  gameSubmitApi,
  questionSubmitApi,
  userQuestionSubmitApi,
  questionCloseApi,
  winBetApi,
  loseBetApi,
} = require('../helpers/game');
const {
  userApi,
  newSubscriberApi,
  setAvatarApi,
  setInfoApi,
} = require('../helpers/user');
const { send } = require('micro');
const { hookApi, payoutApi, setCreditApi } = require('../helpers/stripe');

const postApi = (fn) => async (req, res) => {
  try {
    const parse = req.url.split('/');
    console.log(`post api/${parse[2]}`);

    switch (`api/${parse[2]}`) {
      case 'api/submission':
        return await fn(gameSubmitApi(req, res));
      case 'api/question':
        return await fn(questionSubmitApi(req, res));
      case 'api/userQuestions':
        return await fn(userQuestionSubmitApi(req, res));
      case 'api/endQuestion':
        return await fn(questionCloseApi(req, res));
      case 'api/setCredit':
        return await fn(setCreditApi(req, res));
      case 'api/user':
        return await fn(userApi(req, res));
      case 'api/setAvatar':
        return await fn(setAvatarApi(req, res));
      case 'api/setInfo':
        return await fn(setInfoApi(req, res));
      case 'api/newSub':
        return await fn(newSubscriberApi(req, res));
      case 'api/winBet':
        return await fn(winBetApi(req, res));
      case 'api/loseBet':
        return await fn(loseBetApi(req, res));
      case 'api/payout':
        return await fn(payoutApi(req, res));
      case 'api/hooks':
        return await fn(hookApi(req, res));
      case 'api/dbRefresh':
        return await fn(dbRefresh(req, res));
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
