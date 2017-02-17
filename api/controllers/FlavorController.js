/**
 * FlavorController
 *
 * @description :: Server-side logic for managing Flavors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	search: function( req , res ){

		Flavor.find(
			{ name: {contains:req.query.q}}
		).exec( function(err , Flavor){
			if( err ){
				return res.negotiate( err );
			}
			return res.ok( Flavor );
		});
	},
};
