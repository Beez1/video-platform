# Project Title

A brief description of your project.

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
   

3. The server will run on the specified port (default is 5000).

## Routes

- **Authentication Routes**
  - `POST /auth/register` - Register a new user
  - `POST /auth/login` - Login an existing user

- **Video Routes**
  - `GET /videos` - Retrieve all videos
  - `POST /videos` - Upload a new video

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

