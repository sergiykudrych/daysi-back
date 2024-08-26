const { Schema, model } = require('mongoose');

const InfoSchema = new Schema({
  info: {
    type: {
      phone: String,
      email: String,
      address: String,
      instagram: String,
      facebook: String,
      addressGoogle: String,
    },
    required: true, // Если info всегда должно присутствовать
  },
  price: {
    type: [String],
    required: true, // Если price всегда должно присутствовать
  },
});

module.exports = model('Info', InfoSchema);
