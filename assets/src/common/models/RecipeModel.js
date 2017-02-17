angular.module('models.recipe', ['services', 'sails.io',])

.service('RecipeModel', function( config , $sailsSocket) {
    this.getAll = function() {
        var url = config.apiUrl + '/recipes/?from=0&to=10';
        return $sailsSocket.get(url).then(success, error);
    };

    this.getOne = function( id ){
      var url = config.apiUrl + '/recipe/' + id;
      return $sailsSocket.get( url ).then( success , error );
    };

    this.create = function(newModel) {
        var url = config.apiUrl + '/recipe';
        return $sailsSocket.post(url, newModel).then(success, error);
    };

    this.delete = function( id ) {
        var url = config.apiUrl + '/recipe/' + id;
        return $sailsSocket.delete(url).then(success, error);
    };

    this.search = function( search_value ){
        var url = config.apiUrl + '/recipe/search/?q=' + search_value;
        console.log( url );
        return $sailsSocket.get( url ).then( success ,error );
    };

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        return error;
    };
});
