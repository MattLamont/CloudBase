/**
 * RecipeController
 *
 * @description :: Server-side logic for managing Recipes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getAll: function( req , res ){
		if( !req.query.from ){
			req.query.from = 0;
		}

		if( !req.query.to ){
			req.query.to = 20;
		}

		Recipe.find({
			skip: req.query.from,
			limit: req.query.to - req.query.from
		}).exec( function( err , recipe ){

			if( err ){
				return res.negotiate( err );
			}

			return res.ok( recipe );
		});
	},

	getOne: function( req , res ){

		Recipe.find({
			id: req.param('id')
		}).exec( function( err , recipe ){
			if( err ){
				return res.negotiate( err );
			}
			return res.ok( recipe );
		});
	},

	create: function( req , res ){

		Recipe.create( req.body ).exec( function( err , recipe ){
			if( err ){
				return res.negotiate( err );
			}
			return res.ok( recipe );
		});
	},

	destroy: function( req , res ){

		Recipe.destroy({}).exec( function( err , recipe ){
			if( err ){
				return res.negotiate( err );
			}
			return res.ok();
		});
	},

	update: function( req , res ){
		Recipe.update({id:req.param('id')}).exec( function( err , recipe ){
			if( err ){
				return res.negotiate( err );
			}
			return res.ok( recipe );
		});
	},

	search: function( req , res ){
		sails.log.info( "query=");
		sails.log.info( req.query.q );
		Recipe.find(
			{ name: {contains:req.query.q}}
		).exec( function(err , recipe){
			if( err ){
				return res.negotiate( err );
			}
			return res.ok( recipe );
		});
	},
};
