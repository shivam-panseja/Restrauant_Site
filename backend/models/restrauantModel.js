const mongoose = require("mongoose");

const restrauantSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Restrauant title is required"],
  },
  imageUrl: {},
  foods: {
    type: String,
    required: [true, "Restrauant title is required"],
  },

  time: {
    type: String,
  },
  pickup: {
    type: Boolean,
    default: true, // ✅ this automatically adds createdAt and updatedAt
  },
  delivery: {
    type: Boolean,
    default: true, // ✅ this automatically adds createdAt and updatedAt
  },
  isOpen: {
    type: Boolean,
    default: true
  },
  logoUrl: {
    type: String,

  },
  rating : {
    type: Number,
    default: 1,
    min: 1,
    max: 5
  },
  ratingCount: {
    type:String
  },
  coords:{
    id:{type:String},
    latitude: {type:Number},
    latitudeDelta: {type:Number},
    longitude: {type:Number},
    longitudeDelta: {type:Number},
    address:{type:String},
    title:{type:String}
  }
},
  {timestamps: true}

);

const user = mongoose.model("user", restrauantSchema);
module.exports = user;
