const { uuid } = require('uuidv4');

const User = require('../../schemas/User');

const users = [];

module.exports = {
  Query: {
    users: () => users,
    user: (_, { name }) => users.find(user => user.name === name),
  },

  Mutation: {
    createUser: (_, { name, email }) => {
      const user = new User();

      Object.assign(user, { _id: uuid(), name, email });

      users.push(user);

      return user;
    },
    updateUser: (_, { id, name, email }) => {
      const findIndex = users.findIndex(findUser => findUser.id === id);

      const updatedUser = {
        id,
        name,
        email,
      };

      users[findIndex] = updatedUser;

      return updatedUser;
    },
    deleteUser: (_, { id }) => {
      const findIndex = users.findIndex(findUser => findUser.id === id);

      console.log(findIndex);

      if (findIndex < 0) {
        return new Error('User not found.');
      }

      users.splice(findIndex, 1);

      return users;
    },
  },
};
