// models/character.cjs
const { Schema, model } = require('mongoose');

const characterSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true },
    
      picture: { 
      type: String, 
      required: true },
  },
  { timestamps: true }
);

module.exports = model('Character', characterSchema);
