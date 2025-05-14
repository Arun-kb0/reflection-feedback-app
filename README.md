# Reflection feedback app

Building an application for receiving and sending feedback among peers can be a powerful tool for collaboration and personal or professional growth.

## Tech Stack

- **Backend**: Node.js, Express.js, Typescript
- **ORM**: Mongoose
- **Database**: MongoDB
- **Architecture**: Repository Pattern


## Installation

### Prerequisites

- **npm** or **yarn**

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/reflection-feedback-app.git
   cd reflection-feedback-app
   ```

2. **Install Dependencies**
   Install all the required dependencies using `npm` or `yarn`:
   run inside client and server folder
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the server dir of the project and configure your database connection:
   ```env
   MONGO_DB_URI= mongodb uri
   PORT= port
   LIMIT=limit
   ```

4. **Start the Development Server**
   Launch the application in development mode:
   run inside client and server folder
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the Application**
   Access the API server at `http://localhost:3001` to interact with the backend services.
   Open the client application at `http://localhost:5173` to explore the user interface and interact with the application.
