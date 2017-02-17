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
      type: 'string',
      required: true
    },

    images: {
      type: 'array',
      defaultsTo: []
    },

    nicotine: {
      type:'json',
      required: true
    },

    pg: {
      type:'json',
      required: true
    },

    vg:{
      type:'json',
      required: true
    },

    flavors: {
      type: 'json',
      required: true
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
