Insurance Policy System

This project is a full-stack application for managing insurance policies. 
It includes an Angular front-end and a C# (.NET) back-end API that communicates with a PostgreSQL database.
This guide will walk you through how to set up and run the application locally using Docker.

 

 


 

Getting Started.
Prerequisites
Before you begin, ensure the following are installed on your local machine:
 - Docker - for containerizing the front-end, back-end, and database services.
 - Docker Compose - for managing multi-container Docker applications (usually included with Docker Desktop).

Setting Up Locally
Step 1: Clone the Repository
Start by cloning the repository to your local machine:
git clone https://github.com/yourusername/insurance-management.git
cd insurance-management

Step 2: Environment Variables (Optional)
You can customize the PostgreSQL environment variables used in Docker, like the database user, password, and database name. You can do this by adding a .env file in the root of your project:
plaintext
Copy
POSTGRES_USER=insurance
POSTGRES_PASSWORD=insurance254
POSTGRES_DB=insurancedb
This will be used by Docker Compose to set up your PostgreSQL container with the desired credentials.

Step 3: Build and Run the Application with Docker Compose
1.	Make sure Docker is running on your machine.
2.	Navigate to the root directory of the project (where docker-compose.yml is located):
cd insurance-management
3.	Build and start the containers using Docker Compose:
docker-compose up --build
This will:
•	Build the Docker images for the .NET API and PostgreSQL database.
•	Start the containers for the front-end, back-end, and PostgreSQL database.

Step 4: Access the Application
•	Frontend (Angular app): http://localhost:4200
•	Backend API (C# .NET API): http://localhost: 7035
•	PostgreSQL Database: Running on localhost:5432, but it’s typically accessed by the back-end API for data storage.

2. Running Individually (Without Docker)
If you'd prefer to run the Angular front-end, .NET back-end, and PostgreSQL database individually without Docker, follow these steps:
1. Setting Up Angular Front-End
Step 1: Install Node.js and Angular CLI
Ensure you have Node.js and Angular CLI installed on your local machine.
npm install -g @angular/cli
Step 2: Install Dependencies
Navigate to the frontend directory of the project and install the dependencies:
cd frontend
npm install
Step 3: Run the Angular Application
Once the dependencies are installed, run the Angular app locally:
ng serve
The Angular app will be available at http://localhost:4200.

2. Setting Up .NET Back-End API
Step 1: Install .NET SDK
Ensure you have .NET SDK 8 installed on your local machine.
Step 2: Restore Dependencies
Navigate to the backend folder of the project and restore the necessary dependencies:
cd backend
dotnet restore

Step 3: Set Up PostgreSQL Database Connection
The .NET back-end will require connection details for the PostgreSQL database. These can be set in the appsettings.json file.

Step 4: Run the .NET API
Once the dependencies are restored and connection string is set, run the back-end API locally:
dotnet run


