# Image Processing Service - Frontend

Frontend application for the Image Processing Service built with React, TypeScript, and Vite.

This application allows users to register, log in, upload images, apply transformations, and view processed images.

---

## Features

### Authentication
- User Registration
- User Login
- JWT Token Storage
- Protected API Requests

### Image Processing
- Upload Images
- Preview Uploaded Images
- Resize Images
- Rotate Images
- Convert Image Formats (JPEG, PNG, WEBP)
- View Transformed Images

---

## Tech Stack

- React
- TypeScript
- Vite
- Axios
- React Router DOM

---

## Folder Structure

```txt
src/
│
├── components/
│   ├── UploadForm.tsx
│   ├── TransformForm.tsx
│   └── Navbar.tsx
│
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Dashboard.tsx
│
├── services/
│   └── api.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## Installation

Clone the repository and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

The application will run on:

```txt
http://localhost:5173
```

---

## Environment Variables

Create a `.env` file in the frontend directory.

```env
VITE_API_URL=http://localhost:5000
```

For production:

```env
VITE_API_URL=https://your-backend.onrender.com
```

---

## Available Pages

### Login

```txt
/
```

Allows existing users to log in.

---

### Register

```txt
/register
```

Allows new users to create an account.

---

### Dashboard

```txt
/dashboard
```

Allows authenticated users to:

- Upload images
- Preview images
- Apply transformations
- View transformed results

---

## API Integration

The frontend communicates with the backend using Axios.

Example configuration:

```ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
```

JWT tokens are automatically attached to authenticated requests.

---

## Build for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Deployment

Recommended Platforms:

- Vercel
- Netlify

Deployment requires:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Future Enhancements

- Grayscale Filter
- Blur Filter
- Flip / Mirror Transformations
- Image Gallery
- Download Processed Images
- Dark Mode

---

## Author

Khushi Bhardwaj