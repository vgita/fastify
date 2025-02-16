'use strict'

const fp = require('fastify-plugin')
const fastifySwagger = require('@fastify/swagger')
const fastifySwaggerUi = require('@fastify/swagger-ui')
const pkg = require('../package.json')

module.exports = fp(
  async function swaggerPlugin (fastify, opts) {
    fastify.register(fastifySwagger, {
      swagger: {
        info: {
          title: 'Fastify app',
          description: 'Fastify Book examples',
          version: pkg.version
        }
      }
    })
    fastify.register(fastifySwaggerUi, {
      routePrefix: '/docs',
      exposeRoute: fastify.secrets.NODE_ENV !== 'production'
    })
  },
  { dependencies: ['application-config'] }
)
