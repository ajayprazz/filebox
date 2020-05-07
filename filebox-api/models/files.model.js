const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    filename: String,
    extension: String,
    originalname: String,
    mimetype: String,
    size: Number
}, {
    timestamps: true
});

const FileModel = mongoose.model("file", FileSchema);

module.exports = FileModel;