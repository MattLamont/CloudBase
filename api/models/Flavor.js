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

    company: {
      type: 'string',
      required: true
    },

    brand: {
      type: 'string',
      defaultsTo: 'None'
    },

    sizes: {
      type: 'array',
      defaultsTo: []
    },

    tags: {
      type: 'array',
      defaultsTo: ['Flavor']
    },

    cost: {
      type: 'string',
      defaultsTo: '0.00'
    },

    description: {
      type: 'string',
      defaultsTo: 'None'
    }

  }
};
