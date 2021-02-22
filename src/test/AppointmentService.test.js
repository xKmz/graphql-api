const { expect } = require('chai');
const mongoose = require('mongoose');
const { uuid } = require('uuidv4');

const Appointment = require('../schemas/Appointment');
const User = require('../schemas/User');

let user;

describe('Test Appointment Service', () => {
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/desafio-backend-tests', {
      useNewUrlParser: true,
    });

    user = await User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
    });
  });

  after(async () => {
    mongoose.disconnect();
  });

  it('Should be result a new appointment', async () => {
    const appointment = await Appointment.create({
      date: '20/02/2021',
      iniHour: '08:00:00',
      endHour: '09:00:00',
      userId: user._id,
    });

    expect(appointment.date).to.be.eq('20/02/2021');
    expect(appointment.iniHour).to.be.eq('08:00:00');
    expect(appointment.endHour).to.be.eq('09:00:00');
    expect(appointment.userId).to.be.eq(user._id);
  });

  it('Should be find a appointments', async () => {
    const appointment = await Appointment.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
    ]);

    expect(appointment).to.be.an('array');
  });

  it('Should be find a especific appointment', async () => {
    await Appointment.create({
      date: '20/02/2021',
      iniHour: '09:00:00',
      endHour: '10:00:00',
      userId: user._id,
    });

    const resultAppointment = await Appointment.aggregate(
      [
        {
          $match: { userId: mongoose.Types.ObjectId(user._id) },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        return result;
      },
    );

    expect(resultAppointment).to.be.an('array');
  });

  it('Should be able to update a especific appointment', async () => {
    const appointment = await Appointment.create({
      date: '20/02/2021',
      iniHour: '08:00:00',
      endHour: '09:00:00',
      userId: user._id,
    });

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      {
        _id: appointment._id,
      },
      {
        $set: {
          date: '20/02/2021',
          iniHour: '12:00:00',
          endHour: '13:00:00',
          userId: user._id,
        },
      },
      async (err, updatedappointment) => {
        if (err) {
          console.log(err);
        }
        return updatedappointment;
      },
    );

    expect(updatedAppointment.iniHour).to.be.eq('12:00:00');
    expect(updatedAppointment.endHour).to.be.eq('13:00:00');
  });

  it('Should be able to delete a especific appointment', async () => {
    const appointment = await Appointment.create({
      date: '20/02/2021',
      iniHour: '10:00:00',
      endHour: '11:00:00',
      userId: user._id,
    });

    const deletedAppointment = await Appointment.findOneAndDelete({
      _id: appointment._id,
    });

    const result = await Appointment.findById({ _id: deletedAppointment._id });

    expect(result).to.be.null;
  });
});
