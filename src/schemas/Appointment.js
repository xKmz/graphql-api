const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  date: String,
  iniHour: String,
  endHour: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
