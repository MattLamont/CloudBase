/**
 * FlavorController
 *
 * @description :: Server-side logic for managing Flavors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getAll: function(req, res) {
    if (!req.query.from) {
      req.query.from = 0;
    }

    if (!req.query.to) {
      req.query.to = 20;
    }

    Flavor.find({
      skip: req.query.from,
      limit: req.query.to - req.query.from
    }).exec(function(err, flavor) {

      if (err) {
        return res.negotiate(err);
      }

      return res.ok(flavor);
    });
  },

  getOne: function(req, res) {

    Flavor.find({
      id: req.param('id')
    }).exec(function(err, flavor) {
      if (err) {
        return res.negotiate(err);
      }
      return res.ok(flavor);
    });
  },

  create: function(req, res) {

    Flavor.create(req.body).exec(function(err, flavor) {
      if (err) {
        return res.negotiate(err);
      }
      return res.ok(flavor);
    });
  },

  destroy: function(req, res) {

    Flavor.destroy({}).exec(function(err, flavor) {
      if (err) {
        return res.negotiate(err);
      }
      return res.ok();
    });
  },

  update: function(req, res) {
    Flavor.update({
      id: req.param('id')
    }).exec(function(err, flavor) {
      if (err) {
        return res.negotiate(err);
      }
      return res.ok(flavor);
    });
  },

  search: function(req, res) {

    Flavor.find({
      name: {
        contains: req.query.q
      }
    }).exec(function(err, Flavor) {
      if (err) {
        return res.negotiate(err);
      }
      return res.ok(Flavor);
    });
  },
};
