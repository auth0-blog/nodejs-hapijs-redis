const Joi = require('joi');
const Boom = require('boom');

module.exports = {
  method: 'POST',
  path: '/todo',
  options: {
    auth: 'jwt',
    validate: {
      payload: {
        item: Joi.string().required().notes('Text to store in list')
      },
    },
    description: 'Add item',
    notes: 'Add an item to the list',
    tags: ['api'],
  },
  handler: async (request, h) => {
    let {sub: redispath} = request.auth.credentials;
    let {item: redisvalue} = request.payload;
    let {redis} = request.server.app;

    try {

      let count = await redis.lpushAsync(redispath, redisvalue);

      return h.response({
        count
      }).code(201);

    } catch (e) {
      return Boom.badImplementation(e);
    }
  }
};
