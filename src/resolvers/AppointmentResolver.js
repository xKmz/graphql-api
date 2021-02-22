const mongoose = require('mongoose');
const Appointment = require('../schemas/Appointment');

module.exports = {
  Query: {
    appointments: () =>
      Appointment.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
      ]),
    appointment: (_, { id }) =>
      Appointment.aggregate(
        [
          {
            $match: { userId: mongoose.Types.ObjectId(id) },
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
        (err, appointment) => {
          if (err) {
            console.log(err);
          }
          return appointment;
        },
      ),
  },

  Mutation: {
    createAppointment: (_, { date, iniHour, endHour, userId }) =>
      Appointment.create({ date, iniHour, endHour, userId }),
    updateAppointment: (_, { id, ...args }) =>
      Appointment.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set: {
            ...args,
          },
        },
        (err, appointment) => {
          if (err) {
            console.log(err);
          }
          return appointment;
        },
      ),
    deleteAppointment: (_, { id }) => Appointment.findOneAndDelete({ _id: id }),
  },
};
