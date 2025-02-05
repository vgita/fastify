module.exports = {
  level: process.env.LOG_LEVEL,
  //   transport: {
  //     targets: [
  //       {
  //         target: 'pino/file',
  //         options: {
  //           destination: require('path').join(__dirname, '../logs/errors.log')
  //         },
  //         level: 'trace'
  //       },
  //       {
  //         target: 'pino/file',
  //         options: {
  //           destination: 1
  //         }
  //       }
  //     ]
  //   },
  timestamp: () => {
    const dateString = new Date(Date.now()).toISOString()
    return `,"@timestamp":"${dateString}"`
  },
  redact: {
    censor: '***',
    paths: [
      'req.headers.authorization',
      'req.body.password',
      'req.body.salt',
      'req.body.hash',
      'req.body.token'
    ]
  },
  serializers: {
    req: function (request) {
      const shouldLogBody = request.routeOptions.config.logBody

      return {
        method: request.method,
        url: request.url,
        routerPath: request.routerPath,
        version: request.headers?.['accept-version'],
        user: request.user?.id,
        headers: request.headers,
        body: shouldLogBody ? request.body : undefined,
        hostname: request.hostname,
        remoteAddress: request.ip,
        remotePort: request.socket?.remotePort
      }
    },
    res: function (reply) {
      return {
        statusCode: reply.statusCode,
        responseTime: reply.elapsedTime
      }
    }
  }
}
