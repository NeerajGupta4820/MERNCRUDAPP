const mongoose = require("mongoose");
const fs = require("fs"); // Require the 'fs' module

const studSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  profile: {
    type: String
  },
  documenetImg: {
    type: [String],
    // validate: {
    //   validator: function (images) {
    //     const maxSize = 1024; // 1KB in bytes
    //     const maxTotalSize = 1024 * 1024; // 1MB in bytes

    //     for (const image of images) {
    //       const stats = fs.statSync('public/images/' + image);
    //       if (stats.size > maxSize) {
    //         return false; // Individual image size check failed
    //       }
    //     }

    //     const totalSize = images.reduce((total, image) => {
    //       const stats = fs.statSync('public/images/' + image);
    //       return total + stats.size;
    //     }, 0);

    //     return totalSize <= maxTotalSize; // Total size check
    //   },
    //   message: "Document image(s) size validation failed."
    // }
  }
});

const students = mongoose.model("students", studSchema);
module.exports = students;
