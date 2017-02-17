/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  'get /': {
    controller: 'HomeController',
    action: 'index'
  },

  'get /login': 'AuthController.login',
  'post /logout': 'AuthController.logout',
  'get /logout': 'AuthController.logout',
  'get /register': 'AuthController.register',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',

    /**
     * User routes
     */
    'get /api/user': 'UserController.getAll',
    'get /api/user/:id': 'UserController.getOne',
    'post /api/user': 'UserController.create',


  /* Popular routes */
    'get /popular': 'PopularController.getAll',
    'get /popular': 'PopularController.getOne',
    'post /popular': 'PopularController.create',
    'delete /popular': 'PopularController.destroy',
    'put /popular/:id': 'PopularController.update',

  /* Recipe Routes */
  'get /api/recipes': 'RecipeController.getAll',
  'get /api/recipe/:id': 'RecipeController.getOne',
  'post /api/recipe': 'RecipeController.create',
  'delete /api/recipe': 'RecipeController.destroy',
  'put /api/recipe/:id': 'RecipeController.update',
  'get /api/recipe/search': 'RecipeController.search',


  /* Flavor Routes */
  'get /api/flavor/search': 'FlavorController.search',

  // If a request to a URL doesn't match any of the custom routes above, it is matched
  // against Sails route blueprints.  See `config/blueprints.js` for configuration options
  // and examples.

  'get /home': 'HomeController.index',
  'get /about': 'HomeController.index',
  'get /recipe/:id': 'HomeController.index',
  'get /recent': 'HomeController.index',
  'get /creation': 'HomeController.index',
};
