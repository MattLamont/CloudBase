var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    username: {
      type: 'string',
      unique: true
    },
    email: {
      type: 'email',
      unique: true
    },

    image: {
      type: 'string',
      defaultsTo: 'https://s3.amazonaws.com/cloudbaseuserimages/ic_account_circle_black_48px.svg'
    },

    createdRecipes: {
      collection: 'recipe',
      via: 'id'
    },

    likedRecipes: {
      collection: 'recipe',
      via: 'likedBy',
      dominant: true
    },

    savedRecipes: {
      collection: 'recipe',
      via: 'savedBy',
      dominant: true
    },

    passports: {
      collection: 'Passport',
      via: 'user'
    }
  }
};

module.exports = User;
