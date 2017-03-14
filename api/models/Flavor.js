/**
 * Flavor.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    brand: {
      type: 'string',
      defaultsTo: 'None'
    },

    link: {
      type: 'string',
      required: true
    },

    tags: {
      type: 'array',
      defaultsTo: ['Flavor']
    },

    description: {
      type: 'string',
      required: true
    },

    likes: {
      type: 'integer',
      defaultsTo: 0
    },

    dislikes: {
      type: 'integer',
      defaultsTo: 0
    },

    rating: {
      type: 'integer',
      defaultsTo: 0
    }

  }
};
