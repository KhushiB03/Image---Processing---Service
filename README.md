# Image Processing Service

A full-stack image processing application inspired by Cloudinary.

Users can register, upload images, perform transformations, and retrieve transformed images through a simple web interface.

---

## Live Demo

Frontend:

https://image-processing-frontend-kappa.vercel.app/

Backend:

https://image-processing-service-26hy.onrender.com

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Image Processing

- Upload Images
- Resize Images
- Rotate Images
- Convert Image Formats
- Cloud Storage Integration

### Storage

- MongoDB Atlas
- Cloudinary

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Axios
- React Router DOM

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT
- Bcrypt

### Image Processing

- Sharp
- Cloudinary

---

## Architecture

```txt
React Frontend
      │
      ▼
Express API
      │
      ▼
MongoDB Atlas

      │
      ▼
Cloudinary Storage

      │
      ▼
Sharp Transformations
```

---

## Screenshots

### Login Page

<img src="frontend/public/login.png" width="800">


### Dashboard

<img src="frontend\public\dashboard.png" width="800">



### Register Page

frontend\public\register.png

---

## Local Setup

Clone repository:

```bash
git clone <repo-url>
```

Backend:

```bash
cd backend

npm install

npm run dev
```

Frontend:

```bash
cd frontend

npm install

npm run dev
```

---

## Future Improvements

- Grayscale Filter
- Watermarking
- Image Deletion
- Batch Processing
- Transformation History

---

## Author

Khushi Bhardwaj
