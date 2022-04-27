const express = require('express');
// const app = express();
const app = require('./app');

const connectDatabase = require('./config/database')
const dotenv = require('dotenv');
const cloudinary = require ('cloudinary');
 
app.use(express.json());

 

dotenv.config({path: 'backend/config/config.env'})

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


app.listen(process.env.PORT, () => {
	console.log(`server started on port:' ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});