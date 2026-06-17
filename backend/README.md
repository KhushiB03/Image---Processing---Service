# Image Processing Service

A full-stack image processing application inspired by Cloudinary.

Users can register, log in, upload images, apply transformations, and retrieve transformed images.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### Image Management

* Upload Images
* Store Images on Cloudinary
* Save Metadata in MongoDB Atlas

### Image Transformations

* Resize Images
* Rotate Images
* Convert Formats (JPEG, PNG, WebP)

## Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB Atlas
* Mongoose
* JWT
* Bcrypt

### Image Processing

* Sharp
* Cloudinary

### Frontend

* React
* Vite
* Axios

## API Endpoints

### Authentication

POST /auth/registerUser

POST /auth/loginUser

GET /auth/me

### Images

POST /images

POST /images/:id/transform

## Environment Variables

PORT=

MONGO_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

## Installation

npm install

npm run dev

## Future Improvements

* Watermarking
* Image Filters
* Image Deletion
* Pagination
* Batch Processing

## Author

Khushi Bhardwaj
