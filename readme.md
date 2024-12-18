# VIDEO SERVER

This project is a Node.js-based server application that provides APIs for authentication and video management. It uses MongoDB as the database for storing application data and integrates with Cloudinary for video and image processing. The application is built using the Express framework, ensuring modularity and flexibility for future enhancements.

## Installation

1. Clone the repository:
   
   git clone <repository-url>
   
2. Navigate to the project directory:
   
   cd <project-directory>
   
3. Install the dependencies:
   
   npm install
   

## Usage

1. Create a `.env` file in the root directory and add your MongoDB URI:
   
   MONGO_URI=<your-mongodb-uri>
   PORT=<your-port>
   

2. Start the server:
   
   npm start
   

3. The server will run on the specified port (default is 3000).

## Routes

- **Authentication Routes**
  - `POST /auth/register` - Register a new user
  - `POST /auth/login` - Login an existing user
  - `PUT /auth/update-username` - Update user's username
  - `PUT /auth/update-password` - Update user's password
- **Video Routes**
  - `GET /videos` - Retrieve user's videos
  - `POST /videos/upload` - Upload a new video
  - `DELETE /videos/:id` - Delete a video

