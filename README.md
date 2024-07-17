# GymUp - Gym Management App (React TypeScript)

## Description
GymUp is a web application built with React and TypeScript for managing gym memberships. It allows users to:

* Subscribe to memberships using Stripe (Note: Real transactions are disabled in this testing version)
* Mark attendance of gym members
* View member statistics
* View revenue statistics

## Installation

## Prerequisites
Ensure you have Node.js (version 16 or later) and npm (or yarn) installed on your system. You can download them from the official Node.js website (https://nodejs.org/en).

## Clone the Repository
Open your terminal and clone this repository using the following command:

```Bash
git clone https://github.com/SM-Haris/gym-web-app-frontend.git
```

Use code with caution.
content_copy

## Install Dependencies
Navigate to the project directory:

```Bash
cd gym-web-app
```

Use code with caution.
content_copy

## Install the project dependencies using npm or yarn:

```Bash
npm install
```

Use code with caution.
content_copy

## Start the Development Server:

```Bash
npm start
```

Use code with caution.
content_copy

This will start the development server, typically running on http://localhost:3000 by default. Open this URL in your web browser to access the application.

## Functionality
GymUp offers a comprehensive suite of features to simplify gym operations:

* **User Management**: Users can sign up, log in, and subscribe to memberships using Stripe.
* **Gym Creation & Management**: Gym owners can create and manage their gyms with ease.
* **Member Management**: Add, edit, and remove members, keeping track of their attendance and workout details.
* **Attendance Tracking**: Mark members present or absent, along with logging their workout hours.
* **Subscription Management**: Securely manage subscriptions through Stripe integration.
* **Data Visualization**: Gain valuable insights through customizable charts.

**Note**: While this version showcases the application's functionalities, real Stripe transactions are disabled for demonstration purposes.

## Deployment
GymUp is designed for deployment on a hosting platform like Netlify or Vercel. These platforms offer seamless deployment from your Git repository, allowing you to make your gym management application readily accessible.

Here's a general deployment guideline:

* **Choose a Hosting Platform**: Select a reliable hosting provider like Netlify or Vercel. Sign up for an account and familiarize yourself with their deployment process.

* **Prepare Your Application**: Ensure your application is production-ready. This may involve building the project for production and potentially running any necessary pre-deployment steps as specified in your project's configuration.

* **Connect Your Git Repository**: Link your project's Git repository (e.g., GitHub) to your chosen hosting platform. This allows the platform to automatically deploy your application when you push code changes to your repository.

* **Deploy Your Application**: Follow the specific instructions provided by your hosting platform to initiate deployment. This typically involves setting up build commands and deployment configurations.

* **Access Your Deployed Application**: Once deployment is successful, you'll receive a URL from your hosting platform where your application is publicly accessible. Share this URL with your gym members or staff to grant them access to the gym management system.

**Remember**: Specific deployment instructions may vary depending on your chosen hosting provider. Refer to their documentation for detailed guidance.


## Contributing

We appreciate contributions to this project! However, as the license is currently unspecified, we recommend you discuss your contribution plans with the project owner.

## Docker Support
This project includes a docker.yaml file and a Dockerfile to create a Docker image of the application. You can use these files to deploy the application in a containerized environment.

### Prerequisites:
**Docker:** Ensure you have Docker installed on your system. You can download and install Docker from the official website (https://www.docker.com/products/docker-desktop/).
Instructions:

### Navigate to the project directory:

```Bash
cd gym-web-app-backend
```

### Build and run the container:

```Bash
docker-compose up --build
```

This command performs the following actions:

Builds a Docker image for the application using the Dockerfile. (This only happens on the first run or if your code has changed.)
Creates and starts a Docker container based on the image.
Runs the application within the container.
Access the API:

The GymUp backend API will be accessible on your local machine through port 5000. You can access it using a web browser by visiting:

```bash
http://localhost:5000
```

### Additional Notes:

The docker-compose.yaml file defines the configuration for the containerized application.

By default, the docker-compose up --build command starts the container in the foreground. To run it in the background, use the -d flag:

```Bash
docker-compose up --build -d
```

You can stop the container using the following command:

```Bash
docker-compose down
```

This approach allows you to leverage Docker's containerization features for a more isolated and portable deployment of your GymUp backend API.

## Known Issues

This application is for testing purposes only. Real transactions through Stripe are disabled.
Functionality may be limited in this testing version.
Package.json Analysis

## Dependencies
Includes core React and TypeScript libraries along with UI components, Stripe integration, data fetching, and charting libraries.