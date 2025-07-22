const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();

const API_KEY = process.env.IMGBB_KEY;
async function uploadImage(filePath) {
  const form = new FormData();
  form.append('image', fs.readFileSync(filePath).toString('base64'));

  const response = await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, form, {
    headers: form.getHeaders(),
  });

  const url = response.data.data.url;
  // console.log('Uploaded Image URL:', url);

  // You can now insert `url` into your database
  return url;
}
module.exports = uploadImage;

// Example usage:

//uploadImage('public/sample-image.png');
// Replace 'public/sample-image.png' with the path to your image file

