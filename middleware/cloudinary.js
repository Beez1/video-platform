require('dotenv').config();
const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary using the environment variable CLOUDINARY_URL
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_URL.split('@')[1],
  api_key: process.env.CLOUDINARY_URL.split('//')[1].split(':')[0],
  api_secret: process.env.CLOUDINARY_URL.split(':')[2].split('@')[0],
});

module.exports = cloudinary;
