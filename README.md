# Prototype Object Detection Frontend

This project is a web application that uses the YOLOv8 model for object detection in images. The frontend is built with React and TypeScript, while the backend is developed with FastAPI. The application allows users to upload images, select object classes for detection, and view annotated images.

## Features

- **Image Upload**: Upload multiple images for object detection.

- **Class Selection**: Choose which object classes you want to detect.

- **Annotated Image Preview**: View images with highlighted detections.

- **Annotation Export**: Export annotations in JSON format (separate or consolidated).

- **Cache Cleanup**: Clear cached images and annotations.

## Prerequisites

Before starting, make sure you have installed:

- Node.js (for the frontend)

- Python (for the backend)

- Git (to clone the repository)

## How to Run the Project

### 1. Clone the Repository

```bash 
git clone https://github.com/your-username/yolov8-detection-frontend.git
cd yolov8-detection-frontend
```

### 2. Backend Setup (FastAPI)

Navigate to the backend folder:

```bash 
cd backend
```

Create and activate a virtual environment:

```bash 
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

Run the FastAPI server:

```bash 
uvicorn main:app --reload
```

The backend will be available at http://localhost:8000.

### 3. Frontend Setup (React)

Navigate to the frontend folder:

```bash 
cd ../frontend
```

Install dependencies:

```bash 
npm install
```

Run the development server:

```bash 
npm start
```

The frontend will be available at http://localhost:3000.

### 4. Access the Application

Open your browser and go to http://localhost:3000 to use the application.

## Project Structure

- `backend/`: Contains the FastAPI backend code.  
  - `main.py`: Entry point of the backend.  
  - `requirements.txt`: Python dependencies list.  

- `frontend/`: Contains the React + TypeScript frontend code.  
  - `src/`: Frontend source code.  
    - `App.tsx`: Main application component.  
    - `App.css`: Global styles.  
  - `public/`: Static files (images, icons, etc.).

## Dependencies

### Backend (FastAPI)

- **fastapi**: Framework for building the API.

- **uvicorn**: ASGI server to run FastAPI.

- **ultralytics**: Library for using the YOLOv8 model.

- **opencv-python**: For image processing.

### Frontend (React)

- **react**: Library for building interfaces.

- **react-bootstrap**: Bootstrap-based components for React.

- **axios**: For making HTTP requests to the backend.

- **react-zoom-pan-pinch**: For zoom and pan functionality on images.
