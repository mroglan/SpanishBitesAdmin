require('dotenv').config()

module.exports = {
    env: {
        DATABASE_PASS: process.env.DATABASE_PASS,
        BASE_URL: process.env.BASE_URL,
        SIGNATURE: process.env.SIGNATURE,
        CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
        CLOUDINARY_NAME: process.env.CLOUDINARY_NAME
    }
}