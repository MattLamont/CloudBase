/**
 * Recipe.js
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

    tags: {
      type: 'array',
      defaultsTo: ['Recipe']
    },

    cost: {
      type: 'string',
      defaultsTo: '0.00'
    },

    currency: {
      type: 'string',
      defaultsTo: 'USD'
    },

    description: {
      type: 'string',
      defaultsTo: 'None'
    },

    author: {
      type: 'json',
      required: true
    },

    images: {
      type: 'array',
      defaultsTo: []
    },

    totalVolume: {
      type: 'integer',
      required: true
    },

    targetNicotine: {
      type: 'json',
      required: true
    },

    nicotineStrength: {
      type: 'integer',
      required: true
    },

    pg: {
      type: 'json',
      required: true
    },

    vg: {
      type: 'json',
      required: true
    },

    dilutant: {
      type: 'integer',
      defaultsTo: 0
    },

    flavors: {
      type: 'json',
      required: true
    },

    additionalInfo: {
      type: 'string',
      defaultsTo: ''
    },

    views: {
      type: 'integer',
      defaultsTo: 0
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
    },

  }
};
