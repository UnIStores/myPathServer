const mongoose = require("mongoose");

const tagBlockSchema = new mongoose.Schema(
  {
    pathId: { type: Number, requied: true },
    uuid: { type: String, required: true, unique: true },
    tagName: { type: String, requied: true },
    parentId: { type: String },
    html: { type: String },
    defaultPlaceHolder: { type: String },
    placeholder: { type: String },
    direction: { type: String },
  },
  { timestames: true, versionKey: false }
);

module.exports = mongoose.model("tagBlock", tagBlockSchema);
