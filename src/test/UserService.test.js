const { expect } = require('chai');
const mongoose = require('mongoose');

const User = require('../schemas/User');

describe('Test User Service', () => {
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/desafio-backend-tests', {
      useNewUrlParser: true,
    });
  });

  after(async () => {
    mongoose.disconnect();
  });

  it('Should be result a new users', async () => {
    const user = await User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    expect(user.name).to.be.eq('John Doe');
  });

  it('Should be find a user', async () => {
    const user = await User.find();

    expect(user).to.be.an('array');
  });

  it('Should be find a especific user', async () => {
    const user = await User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    const resultUser = await User.findById(user._id);

    expect(resultUser.name).to.be.eq('John Doe');
  });

  it('Should be able to update a especific user', async () => {
    const user = await User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    const resultUser = await User.findByIdAndUpdate(
      {
        _id: user._id,
      },
      {
        $set: {
          name: 'John Tre',
          email: 'johntre@example.com',
        },
      },
      (err, updatedUser) => {
        if (err) {
          console.log(err);
        }
        return updatedUser;
      },
    );

    expect(resultUser.name).to.be.eq('John Tre');
    expect(resultUser.email).to.be.eq('johntre@example.com');
  });

  it('Should be able to delete a especific user', async () => {
    const user = await User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    const deletedUser = await User.findOneAndDelete({
      _id: user._id,
    });

    const result = await User.findById({ _id: deletedUser._id });

    expect(result).to.be.null;
  });
});
