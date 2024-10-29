# Product Manager Backend

This is the backend server for the Product Manager application, built with Node.js, Express.js, and PostgreSQL. It provides RESTful APIs for managing products, users, and related functionalities for the app's frontend.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Requirements](#requirements)
- [Setup Instructions](#setup-instructions)
---

## Project Overview

This backend application serves as a REST API to handle product and user data for a product management system. It includes features such as authentication, authorization, data validation, and secure password storage using hashing.

## Technologies Used

1. **Node.js**: JavaScript runtime for server-side development.
2. **Express.js**: Web framework for Node.js, used to build the REST API.
3. **PostgreSQL**: SQL-based relational database used to store data.
4. **Prisma**: ORM for managing and interacting with the PostgreSQL database.
5. **JWT**: JSON Web Token for user authentication and authorization.
6. **Bcrypt.js**: Library for hashing passwords securely.
7. **Dotenv**: Loads environment variables from a `.env` file.
8. **Morgan**: HTTP request logger for logging API requests.
9. **Nodemon**: Tool for auto-restarting the server during development.

## Requirements

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v13 or higher) - [Download and Install](https://www.postgresql.org/download/)

## Setup Instructions

Follow these steps to set up and run the project on your local environment:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/anubhavshavaran/product-manager-backend.git
   cd product-manager-backend
    ```

2. **Install Dependencies**

   ```bash
   npm install
    ```

3. **Set Up Environment Variables**

    Create a .env file in the root directory and add the following environment variables, replacing the values as needed:

   ```bash
    NODE_ENV=production
    PORT=3000
    DATABASE_URL=postgresql://username:password@localhost:5432/database_name?schema=app
    JWT_SECRET=7f5c8f8c6d9b4c5eaa3a6c3f2d1e9b4a0f6b8c7e3d8f9a4b1c2d3e6f7a8b9c0d
    JWT_EXPIRES=30d
    ```

    Don't forget to replace "username", "password" and "database_name" with your corresponding Postgres credentials.

4. **Run Database Migrations**

    Use Prisma to initialize the database schema:

   ```bash
   npx prisma migrate dev
    ```

5. **Start the Server**

    Start the server using Nodemon for automatic restarts during development:

   ```bash
   npm start
    ```

The server should now be running at http://localhost:3000.