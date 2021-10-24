const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: String,
    email: String,
    phone: [Number, "Number required"],
  },
  {
    timestamps: true,
  }
);
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
