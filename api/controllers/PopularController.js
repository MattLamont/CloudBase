/**
 * PopularController
 *
 * @description :: Server-side logic for managing Populars
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

		Popular.find({
			skip: req.query.from,
			limit: req.query.to - req.query.from
		}).exec( function( err , popular ){

			if( err ){
				return res.negotiate( err );
			}

			return res.ok( popular );
		});
	},

	getOne: function( req , res ){

		Popular.findOne({
			id: req.param('id')
		}).exec( function( err , popular ){
			if( err ){
				return res.negotiate( err );
			}
			return res.ok( popular );
		});
	},

	create: function( req , res ){

		Popular.create( req.body ).exec( function( err , popular ){
			if( err ){
				return res.negotiate( err );
			}
			return res.ok( popular );
		});
	},

	destroy: function( req , res ){

		Popular.destroy({}).exec( function( err , popular ){
			if( err ){
				return res.negotiate( err );
			}
			return res.ok();
		});
	},

	update: function( req , res ){
		Popular.update({id:req.param('id')}).exec( function( err , popular ){
			if( err ){
				return res.negotiate( err );
			}
			return res.ok( popular );
		});
	},

};
