const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const schemaUser = new Schema({
  name: { type: String, required: true },
});

const users = model("users", schemaUser);
module.exports = users;
