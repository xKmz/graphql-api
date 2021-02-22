const User = require('../schemas/User');

module.exports = {
  Query: {
    users: () => User.find(),
    user: (_, { id }) => User.findById(id),
  },

  Mutation: {
    createUser: (_, { name, email }) => User.create({ name, email }),
    updateUser: (_, { id, ...args }) =>
      User.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set: {
            ...args,
          },
        },
        (err, user) => {
          if (err) {
            console.log(err);
          }
          return user;
        },
      ),
    deleteUser: (_, { id }) => User.findOneAndDelete({ _id: id }),
  },
};
