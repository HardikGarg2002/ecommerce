const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 200,
        unique: true,
      },
    
  password: {
        type: String,
        trim: true,
        required: true,
      },

  email: {
        type: String,
        trim: true,
        maxlength: 200,
        required: true,
        unique: true,
      },
  address: {
    type: String,
    required: true,
    maxlength: 400,
  },
//   image: {
//     type: Array,
//     default: [],
//   },

  joinedOn: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  cartProducts: {
    type: Array,
    default : []
  },
  cartValue : {
    type : Number,
    default : 0
  }


});

module.exports = mongoose.model("User", userSchema);
