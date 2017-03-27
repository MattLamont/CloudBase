module.exports = {
	getAll: function(req, res) {
		User.find({}).populate('createdRecipes').exec(function(err, user) {

	      if (err) {
	        return res.negotiate(err);
	      }

	      return res.ok(user);
	    });
	},

	getOne: function(req, res) {
		User.findOne( req.param('id') )
		.populate('createdRecipes')
		.populate('likedRecipes')
		.populate('savedRecipes')
		.exec(function(err, user) {
	      if (err) {
	        return res.negotiate(err);
	      }
	      return res.ok(user);
	    });
	},

	create: function (req, res) {
		var model = {
			username: req.param('username'),
			email: req.param('email'),
			first_name: req.param('first_name')
		};

		User.create(model)
		.exec(function(err, model) {
			if (err) {
				return console.log(err);
			}
			else {
				User.publishCreate(model.toJSON());
				res.json(model);
			}
		});
	},

	update: function(req, res) {

      User.update( req.param('id') , req.body )
	  .populate('createdRecipes')
	  .populate('likedRecipes')
	  .populate('savedRecipes')
	  .exec(function(err, user) {

        if (err) {
          return res.negotiate(err);
        }
        return res.ok(user);
      });
    },

	createImage: function(req, res) {

      req.file('file').upload({
        adapter: require('skipper-s3'),
        key: sails.config.aws_s3.key,
        secret: sails.config.aws_s3.secret,
        bucket: 'cloudbaseuserimages'
      }, function(err, filesUploaded) {
        if (err) {
          return res.negotiate(err);
        }

        return res.ok({
          files: filesUploaded,
          textParams: req.params.all()
        });
      });
    },
};
