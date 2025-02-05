const loggerOptions = require('./logger-options');

module.exports = {
  disableRequestLogging: true,
  logger: loggerOptions,
  requestIdLogLabel: process.env.REQUEST_ID_LOG_LABEL,
  requestIdHeader: process.env.REQUEST_ID_HEADER,
  genReqId: (req) => {
    return req.headers[process.env.REQUEST_ID_HEADER] || crypto.randomUUID();
  },
  ajv: {
    customOptions: {
      removeAdditional: 'all'
    }
  }
};
